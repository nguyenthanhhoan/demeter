import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../shared/services/device-field.service';

@Component({
  selector: 'device-field-form',
  templateUrl: './device-field-form.component.html',
  styleUrls: ['./device-field-form.component.css']
})
export class DeviceFieldFormComponent implements OnInit {

  deviceField: any = {};
  mode: string;
  device_id: number;
  field_id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private deviceFieldService: DeviceFieldService,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.device_id = +this.route.snapshot.params['device_id'];
    this.field_id = +this.route.snapshot.params['field_id'];
    if (this.field_id) {
      this.mode = 'edit';
      this.deviceFieldService.getOne(this.device_id, this.field_id)
        .subscribe(data => {
          this.ngZone.run(() => {
            Object.assign(this.deviceField, data);
          });
        });
    } else {
      this.mode = 'new';
    }
  }

  saveOrUpdate() {
    let submitDeviceField = Object.assign({}, this.deviceField);
    submitDeviceField.device_id = this.device_id;
    if (this.mode === 'edit') {
      this.deviceFieldService.put(this.device_id, submitDeviceField).subscribe(data => {
        this.notificationService.showMessage('Device Field updated successfully!');
        this.router.navigate([`/admin/device/${this.device_id}/field`]);
      });
    } else {
      this.deviceFieldService.post(this.device_id, submitDeviceField).subscribe(data => {
        this.notificationService.showMessage('Device Field created successfully!');
        this.router.navigate([`/admin/device/${this.device_id}/field`]);
      });
    }
  }
}
