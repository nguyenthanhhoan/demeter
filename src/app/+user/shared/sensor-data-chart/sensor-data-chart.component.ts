import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { NotificationService } from '../../../shared/utils/notification.service';
import { ZoneService } from '../../../core/services/zone.service';
import { SensorDataService } from '../../../core/services/sensor-data.service';

declare var moment: any;
declare var Highcharts: any;
@Component({
  selector: 'sensor-data-chart',
  templateUrl: './sensor-data-chart.component.html',
  styleUrls: ['./sensor-data-chart.component.css']
})
export class SensorDataChartComponent extends OnDestroy {

  project_id: number;
  zone_id: number;

  isRequesting = false;
  first_loaded = false;
  last_timestamp: any;

  chartTabs: any[] = [{
    lastest_data: null,
    name: 'Temp(°C)',
    chart_series: [],
    chart_ref: null
  }, {
    lastest_data: null,
    name: 'Humidity(%)',
    chart_series: [],
    chart_ref: null
  }, {
    lastest_data: null,
    name: 'Illuminances(lx)',
    chart_series: [],
    chart_ref: null
  }, {
    lastest_data: null,
    name: 'EC(mS/cm)',
    chart_series: [],
    chart_ref: null
  }, {
    lastest_data: null,
    name: 'pH',
    chart_series: [],
    chart_ref: null
  }, {
    lastest_data: null,
    name: 'Water Temp(°C)',
    chart_series: [],
    chart_ref: null
  }];
  activeChartTab = this.chartTabs[0];

  // Show last 5 minutes data
  timeline = 5 * 60 * 1000;

  // Timer to simulate real-time
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private sensorDataService: SensorDataService) {

    super();
    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setActiveChartTab(chartTab) {
    this.activeChartTab = chartTab;
    this.switchTab();
  }

  switchTab() {
    this.loadChart(this.activeChartTab);
  }

  initData() {
    let start_timestamp = moment().valueOf() - this.timeline;
    let end_timestamp = this.last_timestamp = moment().valueOf();
    this.isRequesting = true;
    this.sensorDataService.getByTimestamp(start_timestamp, end_timestamp)
      .subscribe((data) => {
        if (data) {
          this.first_loaded = true;
          console.log('Number of points returned ', data.xAxis.categories.length);

          if (data.xAxis.categories.length === 0) {
            this.notificationService.showErrorMessage({
              title: 'error',
              content: 'No data match your filter.'
            });
          } else {
            // Init chart data with data in the first time request
            this.chartTabs.forEach((chartTab, index) => {
              chartTab.chart_series = data.series[index];

              let length = data.series[index].data.length;
              chartTab.lastest_data = data.series[index].data[length - 1];
            });
            this.loadHighChart(start_timestamp, end_timestamp);
            this.handleDataRealTime();
          }
        }
        this.isRequesting = false;
      });
  }

  loadHighChart(start_timestamp, end_timestamp) {
    System.import('script-loader!highcharts').then(() => {
      return System.import('script-loader!highcharts/highcharts.js');
    }).then(() => {
      Highcharts.setOptions({
        global : {
          useUTC : false
        }
      });
      this.loadChart(this.activeChartTab);
    });
  }

  loadChart(chartData) {
    let index = this.chartTabs.indexOf(chartData);
    let series = chartData.chart_series;
    let pointInterval = Math.round((this.timeline) / series.data.length);
    let chartOpts = {
      chart: {
        backgroundColor: '#F5F3EB',
        type: 'spline'
      },
      title: {
        text: ''
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
          pointStart: moment().valueOf() - this.timeline
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      series: [{
        name: series.name,
        valueSuffix: series.valueSuffix,
        data: [...series.data]
      }]
    };
    setTimeout(() => {
      if (chartData.chart_ref) {
        chartData.chart_ref.update(chartOpts);
      } else {
        // TODO: Check chart-container present first, maybe the page has been navigated out
        chartData.chart_ref = Highcharts.chart('chart-container-' + index, chartOpts);
      }
    });
  }

  // Ideally, this should use Websocket
  handleDataRealTime() {
    let timer = Observable.timer(1000, 5000);
    this.subscription = timer.subscribe(() => {
      let start_timestamp = this.last_timestamp;
      let end_timestamp = this.last_timestamp = moment().valueOf();
      this.sensorDataService.getByTimestamp(start_timestamp, end_timestamp)
        .subscribe((data) => {
          if (data) {
            let newDataReceiveds = data.xAxis.categories;
            this.chartTabs.forEach((chartTab, index) => {

              if (chartTab === this.activeChartTab) {
                // Push data through Highchart API
                newDataReceiveds.forEach((deltaPoint, point_index) => {

                  chartTab.chart_ref.series[0]
                    .addPoint([deltaPoint, data.series[index].data[point_index]], true, true);
                });
              }

              // Push data manually into chart data
              newDataReceiveds.forEach((deltaPoint, point_index) => {
                chartTab.chart_series.data.push(data.series[index].data[point_index]);
                chartTab.chart_series.data.splice(0, 1);

                let length = data.series[index].data.length;
                chartTab.lastest_data = data.series[index].data[length - 1];
              });
            });
          }
        });
    });
  }
}
