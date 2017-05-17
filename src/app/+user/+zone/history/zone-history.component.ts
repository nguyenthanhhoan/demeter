import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

import { AppSettings } from '../../../app.settings';
import { ZoneService } from '../../../core/services/zone.service';
import { SensorDataService } from '../../../core/services/sensor-data.service';
import { NotificationService } from '../../../shared/utils/notification.service';

declare var Highcharts: any;
declare var moment: any;

@Component({
  templateUrl: './zone-history.component.html',
  styleUrls: ['./zone-history.component.css']
})
export class ZoneHistoryComponent implements OnInit {

  @Input()
  zone: any = {};
  project_id: number;
  chartData: any = {
    xAxis: {
      categories: []
    },
    series: []
  };
  isRequesting = false;
  filter: any = {};
  charts: any[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private sensorDataService: SensorDataService,
    private notificationService: NotificationService) {

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];
    this.zoneService.getOne(project_id, id).subscribe(data => {
      Object.assign(this.zone, data);
    });
  }

  queryHistoryData() {
    if (!this.filter.date || !this.filter.start_time || !this.filter.end_time) {
      this.notificationService.showErrorMessage({
        title: 'error',
        content: 'No data match your filter.'
      });
      return;
    } else {
      this.isRequesting = true;
      this.loadHistoryData();
    }
  }

  loadHistoryData() {
    let filter = this.filter;
    let start_timestamp =
      moment(`${filter.date} ${filter.start_time}`,
              AppSettings.date_time_format.date_time).valueOf();

    let end_timestamp =
      moment(`${filter.date} ${filter.end_time}`,
              AppSettings.date_time_format.date_time).valueOf();

    this.sensorDataService.getByTimestamp(start_timestamp, end_timestamp)
      .subscribe((data) => {
        if (data) {
          this.chartData = data;
          console.log('Number of points returned ', this.chartData.xAxis.categories.length);
          if (this.chartData.xAxis.categories.length === 0) {
            this.notificationService.showErrorMessage({
              title: 'error',
              content: 'No data match your filter.'
            });
          } else {
            this.loadHighChart();
          }
        }
        this.isRequesting = false;
      }, () => {
        this.isRequesting = false;
      });
  }

  loadHighChart() {
    System.import('script-loader!highcharts').then(() => {
      return System.import('script-loader!highcharts/highcharts.js');
    }).then(() => {
      this.initChart();
    });
  }

  initChart() {
    Highcharts.setOptions({
      global : {
        useUTC : false
      }
    });
    let timestamps = this.chartData.timestamps;
    let start_timestamp = timestamps[0];
    let end_timestamp = timestamps[timestamps.length - 1];
    this.chartData.series.forEach((series, index) => {
      let pointInterval = Math.round((end_timestamp - start_timestamp) / series.data.length);
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
        this.charts[index] = Highcharts.chart('chart-container-' + index, chartOpts);
      } else {
        let chart = Highcharts.chart('chart-container-' + index, chartOpts);
        this.charts.push(chart);
      }
    });
  }

}
