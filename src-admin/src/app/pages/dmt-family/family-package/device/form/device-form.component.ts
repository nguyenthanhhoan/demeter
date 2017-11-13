import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../../_core/services/notification.service';
import { DeviceService } from '../core/device.service';

@Component({
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {

  deviceField: any = {};
  mode: string;
  package_id: number;
  device_id: number;
  icons: any[] = ['dmt-thermometer', 'dmt-humidity', 'dmt-pump', 'dmt-fan', 'dmt-light-bulb'];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngZone: NgZone,
              private deviceService: DeviceService,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.package_id = +this.route.snapshot.params['package_id'];
    this.device_id = this.route.snapshot.params['device_id'];
    if (this.device_id) {
      this.mode = 'Edit';
      this.deviceService.getOne(this.device_id)
        .subscribe(data => {
          Object.assign(this.deviceField, data);
        });
    } else {
      this.mode = 'Create';
    }
  }

  saveOrUpdate() {
    const submitDeviceField = Object.assign({}, this.deviceField);
    submitDeviceField.family_package_id = this.package_id;
    if (this.mode === 'Edit') {
      this.deviceService.put(submitDeviceField).subscribe(data => {
        this.notificationService.showMessage('Gateway Field updated successfully!');
        this.router.navigate([`/pages/family/package/${this.package_id}/device`]);
      });
    } else {
      this.deviceService.post(submitDeviceField).subscribe(data => {
        this.notificationService.showMessage('Gateway Field created successfully!');
        this.router.navigate([`/pages/family/package/${this.package_id}/device`]);
      });
    }
  }
}
