import { URLSearchParams } from '@angular/http';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DeviceFieldService } from '../../../../core/services/device-field-service';
import { NotificationService } from '../../../../shared/utils/notification.service';

@Component({
  selector: 'zone-control',
  templateUrl: './zone-control.component.html',
  styleUrls: ['./zone-control.component.css']
})
export class ZoneControlComponent implements OnInit {
  fields: any[];
  zone_id: number;

  constructor(private route: ActivatedRoute,
              private deviceFieldService: DeviceFieldService,
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
    });
  }

  transformDeviceValue(fields) {
    fields.forEach(field => {
      field.value = parseInt(field.value, 10) === 1;
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
    let intValue = newValue ? '1' : '0';
    field.isRunning = true;
    this.deviceFieldService.updateDeviceValue({
      device_field_id: field.id,
      value: intValue
    })
    .subscribe(() => {
      this.notificationService.showMessage('Command sent successfully!');
      field.value = newValue;
      field.isRunning = false;
    }, () => {
      this.notificationService.showErrorMessage({
        content: 'Cannot send command!'
      });
      field.isRunning = false;
    });
  }
}
