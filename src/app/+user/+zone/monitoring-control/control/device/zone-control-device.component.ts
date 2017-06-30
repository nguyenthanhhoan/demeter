import {
  AfterViewInit, Component, Input, NgZone, OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { AppSettings } from '../../../../../app.settings';
import { DeviceFieldService } from '../../../../../core/services/device-field-service';
import {
  DeviceValueHistoryService
} from '../../../../../core/services/device-value-history.service';
import { ChartJsComponent } from '../../../../../shared/graphs/chart-js';
import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var moment: any;
@Component({
  selector: 'zone-control-device',
  templateUrl: './zone-control-device.component.html',
  styleUrls: ['./zone-control-device.component.scss']
})
export class ZoneControlDeviceComponent implements OnInit, AfterViewInit {
  fields: any[];

  fieldCharts: any[] = [];

  // To keep refenrence chart component (used for update chart data later)
  fieldChartComponents: any[] = [];
  @ViewChildren('fieldChartEles') fieldChartEles: QueryList<ChartJsComponent>;

  // To handle chart show/hide
  fieldChartViews: boolean[] = [];

  zone_id: number;
  options;
  data;

  charjsOptions = {
    legend: {
      display: false
    },
    scales: {
        yAxes: [{
            type: 'category',
            position: 'left',
            display: true,
        }]
    }
  };

  constructor(private route: ActivatedRoute,
              private deviceFieldService: DeviceFieldService,
              private deviceValueHistoryService: DeviceValueHistoryService,
              private ngZone: NgZone,
              private notificationService: NotificationService) {
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.fetchListDevice();
  }

  ngAfterViewInit() {
    this.fieldChartEles.changes.subscribe(() => {
      if (this.fieldChartEles.toArray().length) {
        this.fieldChartComponents = this.fieldChartEles.toArray();
      }
    });
  }

  fetchListDevice() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('zone_id', this.zone_id.toString());
    params.set('link_type', 'control');
    this.deviceFieldService.getListAssigned({
      search: params
    }).subscribe((fields) => {
      this.transformDeviceValue(fields);
      this.fields = fields;
      this.subscribeWebSocket();
      this.fetchLastestChart();
    });
  }

  fetchLastestChart() {
    this.fields.forEach((field, index) => {
      this.fetchLastestChartForField(field, index);
    });
  }

  fetchLastestChartForField(field, index) {
    if (typeof this.fieldCharts[index] === 'undefined') {
      this.fieldCharts[index] = {
        loading: true
      };
    }

    this.deviceValueHistoryService.getLatest(field.device.name, field.field_id)
    .subscribe(chartData => {
      this.fieldCharts[index] = chartData;
    });
  }

  transformDeviceValue(fields) {
    fields.forEach((field, index) => {
      field.value = parseInt(field.value, 10) === 1;
      field.isRunning = false;
      this.fieldChartViews[index] = false;
    });
  }

  subscribeWebSocket() {
    let ws = new WebSocket(AppSettings.websocketPath);

    // Client Id for debugging purpose
    let clientId = (new Date()).getTime();
    window['socketClientId'] = clientId;

    let subscribeDevices = this.fields.map((field) => {
      return {
        gateway: field.device.name,
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
    let newValue = parseInt(receivedData.value, 10) === 1;
    let timeFormatted = moment(receivedData.timestamp * 1000)
      .format(AppSettings.date_time_format.date_time);
    let valueLabel = newValue ? 'ON' : 'OFF';

    this.fields.forEach((field, index) => {
      if (field.device.name === receivedData.gateway && field.field_id === receivedData.field
        && field.value !== newValue) {
        field.value = newValue;
        this.updateChart(receivedData, index);
      }
    });
  }

  updateChart(receivedData, index) {
    let newValue = parseInt(receivedData.value, 10) === 1;
    let timeFormatted = moment(receivedData.timestamp * 1000)
      .format(AppSettings.date_time_format.date_time);

    let valueLabel = newValue ? 'ON' : 'OFF';
    if (this.fieldChartComponents && this.fieldChartComponents[index] &&
        this.fieldChartComponents[index].chart) {

        this.fieldChartComponents[index].chart.data.xLabels.push(timeFormatted);
        this.fieldChartComponents[index].chart.data.datasets[0].data.push(valueLabel);
        this.fieldChartComponents[index].chart.update();
      } else {
        console.log(`The chart component ${index} hasnot initialized yet!`);
      }
  }

  remove(field) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this device?`
    }, () => {
      this.notificationService.showMessage(`Remove device successfully!`);
      this.deviceFieldService.unassignDeviceToZone({
        zone_id: this.zone_id,
        link_type: 'control',
        device_field_id: field.id
      }).subscribe((fields) => {
        this.fetchListDevice();
      });
    });
  }

  changeValue($event, field) {
    $event.preventDefault();
    let newValue = !field.value;
    let intValue = newValue ? 1 : 0;
    field.isRunning = true;
    this.deviceFieldService.updateDeviceValue({
      device_field_id: field.id,
      value: intValue
    })
    .subscribe(() => {
      this.notificationService.showMessage('Command sent successfully!');
      field.isRunning = false;
    }, () => {
      this.notificationService.showErrorMessage({
        content: 'Cannot send command!'
      });
      field.isRunning = false;
    });
  }
}
