import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { AppSettings } from '../../../../../app.settings';
import { DeviceFieldService } from '../../../../../core/services/device-field-service';
import {
  DeviceValueHistoryService
} from '../../../../../core/services/device-value-history.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var Chart: any;
declare var document: any;
@Component({
  selector: 'zone-control-device',
  templateUrl: './zone-control-device.component.html',
  styleUrls: ['./zone-control-device.component.scss']
})
export class ZoneControlDeviceComponent implements OnInit {
  fields: any[];

  fieldCharts: any[] = [];
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
    this.fieldCharts.push({
      loading: true
    });
    this.deviceValueHistoryService.getLatest(field.device.name, field.field_id)
    .subscribe(chartData => {
      this.fieldCharts[index] = chartData;
    });
  }

  transformDeviceValue(fields) {
    fields.forEach(field => {
      field.value = parseInt(field.value, 10) === 1;
      field.isRunning = false;
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
    this.fields.forEach((field) => {
      if (field.device.name === receivedData.gateway && field.field_id === receivedData.field) {
        field.value = parseInt(receivedData.value, 10) === 1;
      }
    });
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
