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
  last_timestamp: any;
  charts: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private sensorDataService: SensorDataService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  initData() {
    // TODO: Should load from the beginning of the day
    let start_timestamp = moment().valueOf() - 5 * 60 * 1000;
    let end_timestamp = this.last_timestamp = moment().valueOf();
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
          } if (this.chartData.xAxis.categories.length > 100) {
            this.notificationService.showErrorMessage({
              title: 'error',
              content: 'Too many data. Cannot render chart.'
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
      this.initChart();
    });
  }

  initChart() {
    this.chartData.series.forEach((series, index) => {
      let chartOpts = {
        chart: {
          backgroundColor: '#F5F3EB',
        },
        title: {
          text: series.name
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        tooltip: {
          valueSuffix: series.valueSuffix
        },
        xAxis: this.chartData.xAxis,
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
