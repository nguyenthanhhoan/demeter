import { URLSearchParams } from '@angular/http';
import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { SensorDataService } from '../../../../../core/services/sensor-data.service';
import { DeviceFieldService } from '../../../../../core/services/device-field-service';

declare var moment: any;
declare var Highcharts: any;
@Component({
  selector: 'zone-daily-report-environment',
  templateUrl: './zone-daily-report-environment.component.html',
  styleUrls: ['./zone-daily-report-environment.component.css']
})
export class ZoneDailyReportEnvironmentComponent implements OnChanges {

  @Input() date: string;
  @Input() isActive: boolean;
  zone_id: number;

  chartData: any = {
    xAxis: {
      categories: []
    },
    series: []
  };
  isRequesting = false;
  first_loaded = false;
  charts: any[] = [];
  fields: any[];

  timeline: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>,
              private notificationService: NotificationService,
              private deviceFieldService: DeviceFieldService,
              private sensorDataService: SensorDataService) {
  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zone_id);
    })
    .subscribe((zoneModel: any) => {
      this.zone_id = zoneModel.zoneId;
    });
  }

  // When date filter select
  ngOnChanges() {
    // TODO: When this.isRequesting, should cancel previous request
    if (this.date && this.isActive && !this.isRequesting) {
      this.requestDailyChartDataByDate(this.date);
    }
  }

  // When switch tab
  initData() {
    if (!this.date) {
      this.date = moment().format(AppSettings.date_time_format.date_iso);
    }
    this.requestDailyChartDataByDate(this.date);
  }

  requestDailyChartDataByDate(date) {
    console.log('requestDailyChartDataByDate', date);
    if (this.fields && this.fields.length > 0) {
      this.requestDailyChartData(date);
    } else {
      this.requestFieldAssignedToZone(date);
    }
  }

  requestFieldAssignedToZone(date) {
    // Firstly, request list of device assigned to zone
    this.isRequesting = true;
    let params: URLSearchParams = new URLSearchParams();
    params.set('zone_id', this.zone_id.toString());
    params.set('link_type', 'data');
    this.deviceFieldService.getListAssigned({
      search: params
    }).subscribe((fields) => {
      this.fields = fields;
      if (fields.length > 0) {
        this.requestDailyChartData(date);
      } else {
        this.isRequesting = false;
        this.notificationService.showErrorMessage({
          title: 'error',
          content: 'No field was assigned to this zone.'
        });
      }
    });
  }

  requestDailyChartData(date) {
    this.isRequesting = true;
    this.sensorDataService.getByDate(date, this.fields, this.zone_id)
      .subscribe((data) => {
        if (data) {
          this.first_loaded = true;
          this.chartData = data;
          console.log('Number of points returned ', this.chartData.xAxis.categories.length);
          if (this.chartData.xAxis.categories.length === 0) {
            this.notificationService.showErrorMessage({
              title: 'error',
              content: 'No data match your filter.'
            });
          } else {

            // Using timer to make sure DOM has ready
            let timer = Observable.timer(1);
            timer.subscribe(() => {
              this.loadHighChart();
            });
          }
        }
        this.isRequesting = false;
      });
  }

  loadHighChart() {
    System.import('script-loader!highcharts').then(() => {
      return System.import('script-loader!highcharts/highcharts.js')
    }).then(() => {
      Highcharts.setOptions({
        global : {
          useUTC : true,
          timezone: 'Asia/Ho_Chi_Minh'
        }
      });
      this.initChart();
    });
  }

  initChart() {
    // End timestamp should be the lastest timestamp returned
    let timestamps = this.chartData.timestamps;
    let start_timestamp = timestamps[0];
    let end_timestamp = timestamps[timestamps.length - 1];
    this.timeline = end_timestamp - start_timestamp;
    this.chartData.series.forEach((series, index) => {
      let pointInterval = Math.round((this.timeline) / series.data.length);
      let chartOpts = {
        chart: {
          backgroundColor: '#F5F3EB',
          type: 'spline'
        },
        title: {
          text: series.name
        },
        yAxis: {
          title: {
            text: ''
          },
          min: Math.round(Math.min(...series.data)) - series.diff,
          max: Math.round(Math.max(...series.data)) + series.diff
        },
        tooltip: {
          valueSuffix: series.valueSuffix
        },
        plotOptions: {
        spline: {
            pointInterval: pointInterval,
            pointStart: start_timestamp
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            overflow: 'justify'
          }
        },
        series: [
          series
        ]
      };
      if (this.charts[index]) {
        this.charts[index].destroy();
      }
      let chart = Highcharts.chart('chart-container-' + index, chartOpts);
      this.charts[index] = chart;
    });
  }
}
