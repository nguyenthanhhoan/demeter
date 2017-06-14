import { URLSearchParams } from '@angular/http';
import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { NotificationService } from '../../../shared/utils/notification.service';
import { ZoneService } from '../../../core/services/zone.service';
import { SensorDataService } from '../../../core/services/sensor-data.service';
import { DeviceFieldService } from '../../../core/services/device-field-service';

declare var moment: any;
declare var Highcharts: any;
declare var $: any;
@Component({
  selector: 'sensor-data-chart',
  templateUrl: './sensor-data-chart.component.html',
  styleUrls: ['./sensor-data-chart.component.css']
})
export class SensorDataChartComponent implements OnDestroy {

  project_id: number;
  zone_id: number;

  isRequesting = false;
  first_loaded = false;
  last_timestamp: any;

  // TODO: This configure should come from db
  fieldNames: any = {
    field1: 'Temp(°C)',
    field2: 'Humidity(%)',
    field3: 'Illuminances(lx)',
    field4: 'EC(mS/cm)',
    field5: 'pH',
    field6: 'Water Temp(°C)'
  };

  chartTabs: any[] = [];
  activeChartTab = this.chartTabs[0];
  chartInit = false;
  fields: any[];

  // Show last 24 hours data
  timeline = 24 * 60 * 60 * 1000;

  // Period the the time to request new data
  period = 5 * 60 * 1000;

  // Timer to simulate real-time
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private deviceFieldService: DeviceFieldService,
              private sensorDataService: SensorDataService) {

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
    this.isRequesting = true;
    this.requestFieldAssignedToZone();
  }

  requestFieldAssignedToZone() {
    // Firstly, request list of device assigned to zone
    this.isRequesting = true;
    let params: URLSearchParams = new URLSearchParams();
    params.set('zone_id', this.zone_id.toString());
    params.set('link_type', 'summary');
    this.deviceFieldService.getListAssigned({
      search: params
    }).subscribe((fields) => {
      this.fields = fields;
      if (fields.length > 0) {
        this.requestChartData();
      } else {
        this.isRequesting = false;
        this.notificationService.showErrorMessage({
          title: 'error',
          content: 'No field was assigned to this zone. Cannot load environment chart!'
        });
      }
    });
  }

  requestChartData() {
    this.sensorDataService.getLatest(this.fields, this.zone_id)
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
            this.fields.forEach((field, index) => {
              let chartTab: any = {};
              chartTab.chart_series = data.series[index];
              let length = data.series[index].data.length;
              chartTab.lastest_data = data.series[index].data[length - 1];
              chartTab.name = this.fieldNames[field.field_id];
              this.chartTabs.push(chartTab);
            });
            this.activeChartTab = this.chartTabs[0];
            this.loadHighChart();
            this.handleDataRealTime();
          }
        }
        this.isRequesting = false;
      });
  }

  loadHighChart() {
    System.import('script-loader!highcharts').then(() => {
      return System.import('script-loader!highcharts/highcharts.js');
    }).then(() => {
      Highcharts.setOptions({
        global : {
          useUTC : true,
          timezone: 'Asia/Ho_Chi_Minh'
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
        // Check chart-container present first, maybe the page has been navigated out
        if ($('#chart-container-' + index).length > 0) {
          chartData.chart_ref = Highcharts.chart('chart-container-' + index, chartOpts);
          this.chartInit = true;
        } else {
          console.log('Chart container not present!');
        }
      }
    });
  }

  // Ideally, this should use Websocket
  handleDataRealTime() {
    let timer = Observable.timer(1000, this.period);
    let retryCount = 0;
    this.subscription = timer.subscribe(() => {
      if (!this.last_timestamp) {
        // Init last_timestamp, then wait for next tick
        this.last_timestamp = moment().valueOf();
        return;
      }
      let start_timestamp = this.last_timestamp;
      let end_timestamp = this.last_timestamp = moment().valueOf();
      this.sensorDataService
        .getByTimestamp(start_timestamp, end_timestamp, this.fields, this.zone_id)
        .subscribe((data) => {
          if (data) {
            let newDataReceiveds = data.timestamps;

            if (newDataReceiveds && newDataReceiveds.length > 1) {
              let length = newDataReceiveds.length;
              newDataReceiveds.splice(0, length - 1);
            }
            this.chartTabs.forEach((chartTab, index) => {

              if ($('#chart-container-' + index).length === 0) {
                retryCount++;
                if (retryCount > 5 && this.subscription) {
                  this.subscription.unsubscribe();
                }
                return;
              }

              retryCount = 0;
              if (!this.chartInit) {
                // Chart's not init yet. Need wait next tick
                return;
              }

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
