import { Component, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../../core/services/notification.service';
import { DeviceService } from '../../../../../core/api/services/device.service';
import { SensorDataService } from '../../../../../core/api/services/sensor-data.service';

declare var moment: any;
declare var Highcharts: any;
declare var $: any;
@Component({
  selector: 'sensor-data-chart',
  templateUrl: './sensor-data-chart.component.html',
  styleUrls: ['./sensor-data-chart.component.scss']
})
export class SensorDataChartComponent implements OnDestroy {

  project: any = {};
  package_id: any;

  first_loaded = false;
  last_timestamp: any;

  chartTabs: any[] = [];
  activeChartTab = this.chartTabs[0];
  chartInit = false;
  fields: any[];

  // Show last 24 hours data
  timeline = 24 * 60 * 60 * 1000;

  // Period the the time to request new data
  period = 5 * 60 * 1000;

  // Timer to simulate real-time
  subscription: ISubscription;

  // Used as fallback method, if cannot update via websocket,
  // we need to user pulling
  canUpdateViaWebSocket: boolean = false;

  constructor(private store: Store<any>,
              private ngZone: NgZone,
              private notificationService: NotificationService,
              private deviceService: DeviceService,
              private sensorDataService: SensorDataService) {

  }

  ngOnInit() {
    this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = app.project;
        // TODO:
        this.package_id = 'B5NQNMEx8q';
        this.initData();
      }
    });
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
    this.requestFieldAssignedToZone();
  }

  requestFieldAssignedToZone() {
    // Firstly, request list of device assigned to zone
    let params: URLSearchParams = new URLSearchParams();
    params.set('package_id', this.package_id);
    params.set('field_attribute', 'read_only');
    this.deviceService.getListAssigned({
      search: params
    }).subscribe((fields) => {
      this.fields = fields;
      if (this.fields.length > 0) {
        this.requestChartData();
      } else {
        this.first_loaded = true;
      }
    });
  }

  requestChartData() {
    this.sensorDataService.getLatest(this.fields, this.package_id)
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
              chartTab.name = field.name + `(${field.chart_value_suffix})`;
              this.chartTabs.push(chartTab);
            });
            this.activeChartTab = this.chartTabs[0];
            this.loadHighChart();
            this.handleDataRealTime();

            // Subcribe websocket to update real-time data
            this.subscribeWebSocket();
          }
        }
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
        min: Math.round(Math.min(...series.data)) - 1,
        max: Math.round(Math.max(...series.data)) + 1
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
        .getByTimestamp(start_timestamp, end_timestamp, this.fields, this.package_id)
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
                if (typeof chartTab.lastest_data === 'undefined' || !this.canUpdateViaWebSocket) {
                  chartTab.lastest_data = data.series[index].data[length - 1];
                }
              });
            });
          }
        });
    });
  }

  subscribeWebSocket() {
    let ws = new WebSocket(AppSettings.websocketPath);

    // Client Id for debugging purpose
    let clientId = (new Date()).getTime();
    window['socketClientId'] = clientId;

    let subscribeDevices = this.fields.map((field) => {
      return {
        gateway: 'dmt-client',
        fieldId: field.field_id
      };
    });

    ws.onopen = () => {
      ws.send(JSON.stringify({
        topic: 'REGISTER', clientId: clientId,
        devices: subscribeDevices
      }));
    };

    ws.onmessage = (event) => {
      let receivedData = JSON.parse(event.data);
      this.ngZone.run(() => {
        this.updateDeviceValue(receivedData);
      });
    };
  }

  updateDeviceValue(receivedData) {
    let newValue = receivedData.value;
    this.fields.forEach((field, index) => {
      if (field.device.name === receivedData.gateway && field.field_id === receivedData.field
        && field.value !== newValue) {

        console.log(`Received updated value field=${field.field_id}, value=${newValue}`);
        field.value = newValue;
        this.chartTabs[index].lastest_data = newValue;
        this.canUpdateViaWebSocket = true;
      }
    });
  }
}
