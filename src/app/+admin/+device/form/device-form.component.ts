import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';

import { NotificationService } from '../../../shared/utils/notification.service';
import { DeviceService } from '../../shared/services/device.service';

@Component({
  selector: 'device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {

  device = {};
  mode: string;
  device_id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private deviceService: DeviceService,
              private notificationService: NotificationService,
              private ngZone: NgZone) {

  }

  ngOnInit() {
    this.device_id = +this.route.snapshot.params['device_id'];
    if (this.device_id) {
      this.mode = 'edit';
      this.deviceService.getOne(this.device_id)
        .subscribe(data => {
          this.ngZone.run(() => {
            Object.assign(this.device, data);
          });
        });
    } else {
      this.device = {
        device_type: 0,
        api: 0
      };
      this.mode = 'new';
    }
  }

  saveOrUpdate() {
    let submitDevice = this.device;
    if (this.mode === 'edit') {
      this.deviceService.put(submitDevice).subscribe(data => {
        this.notificationService.showMessage('Device updated successfully!');
        this.router.navigate([`/admin/device`]);
      });
    } else {
      this.deviceService.post(submitDevice).subscribe(data => {
        this.notificationService.showMessage('Device created successfully!');
        this.router.navigate([`/admin/device`]);
      });
    }
  }
}
