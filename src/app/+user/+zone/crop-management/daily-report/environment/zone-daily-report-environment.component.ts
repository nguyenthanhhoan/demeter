import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { NotificationService } from '../../../../../shared/utils/notification.service';
import { ZoneService } from '../../../../../core/services/zone.service';
import { SensorDataService } from '../../../../../core/services/sensor-data.service';

declare var moment: any;
declare var Highcharts: any;
@Component({
  selector: 'zone-daily-report-environment',
  templateUrl: './zone-daily-report-environment.component.html',
  styleUrls: ['./zone-daily-report-environment.component.css']
})
export class ZoneDailyReportEnvironmentComponent {

  project_id: number;
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

  timeline: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private sensorDataService: SensorDataService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  initData() {
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let end = new Date();
    end.setHours(23, 59, 59, 999);
    let start_timestamp = start.valueOf();
    let end_timestamp = end.valueOf();
    this.isRequesting = true;
    this.sensorDataService.getByTimestamp(start_timestamp, end_timestamp)
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
              this.loadHighChart(start_timestamp, end_timestamp);
            });
          }
        }
        this.isRequesting = false;
      });
  }

  loadHighChart(start_timestamp, end_timestamp) {
    System.import('script-loader!highcharts').then(() => {
      return System.import('script-loader!highcharts/highcharts.js')
    }).then(() => {
      Highcharts.setOptions({
        global : {
          useUTC : false
        }
      });
      this.initChart(start_timestamp, end_timestamp);
    });
  }

  initChart(start_timestamp, end_timestamp) {
    // End timestamp should be the lastest timestamp returned
    let timestamps = this.chartData.timestamps;
    end_timestamp = timestamps[timestamps.length - 1];
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
        this.charts[index].update(chartOpts);
      } else {
        let chart = Highcharts.chart('chart-container-' + index, chartOpts);
        this.charts.push(chart);
      }
    });
  }
}
