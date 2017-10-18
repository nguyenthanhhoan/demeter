import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../../_core/services/notification.service';
import { GatewayFieldService } from '../../core/gateway-field.service';

@Component({
  templateUrl: './device-field-form.component.html',
  styleUrls: ['./device-field-form.component.scss']
})
export class DeviceFieldFormComponent implements OnInit {

  deviceField: any = {};
  mode: string;
  device_id: number;
  field_id: number;
  icons: any[] = ['dmt-thermometer', 'dmt-humidity', 'dmt-pump', 'dmt-fan', 'dmt-light-bulb'];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private gatewayFieldService: GatewayFieldService,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.device_id = +this.route.snapshot.params['device_id'];
    this.field_id = +this.route.snapshot.params['field_id'];
    if (this.field_id) {
      this.mode = 'Edit';
      this.gatewayFieldService.getOne(this.device_id, this.field_id)
        .subscribe(data => {
          Object.assign(this.deviceField, data);
        });
    } else {
      this.mode = 'Create';
    }
  }

  saveOrUpdate() {
    const submitDeviceField = Object.assign({}, this.deviceField);
    submitDeviceField.device_id = this.device_id;
    if (this.mode === 'Edit') {
      this.gatewayFieldService.put(this.device_id, submitDeviceField).subscribe(data => {
        this.notificationService.showMessage('Gateway Field updated successfully!');
        this.router.navigate([`/pages/corporation/gateway/${this.device_id}/field`]);
      });
    } else {
      this.gatewayFieldService.post(this.device_id, submitDeviceField).subscribe(data => {
        this.notificationService.showMessage('Gateway Field created successfully!');
        this.router.navigate([`/pages/corporation/gateway/${this.device_id}/field`]);
      });
    }
  }
}
