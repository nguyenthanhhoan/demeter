import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../_core/services/notification.service';
import { GatewayService } from '../core/gateway.service';
@Component({
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {

  device: any = {};
  mode: string;
  device_id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gatewayService: GatewayService,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.device_id = +this.route.snapshot.params['device_id'];
    if (this.device_id) {
      this.mode = 'Edit';
      this.gatewayService.getOne(this.device_id)
      .subscribe(data => {
        Object.assign(this.device, data);
      });
    } else {
      this.device = {
        device_type: 0,
        api: 0
      };
      this.mode = 'Create';
    }
  }

  saveOrUpdate() {
    const submitGateway = this.device;
    if (this.mode === 'Edit') {
      this.gatewayService.put(submitGateway).subscribe(data => {
        this.notificationService.showMessage('Gateway updated successfully!');
        this.router.navigate([`/pages/corporation/gateway`]);
      });
    } else {
      this.gatewayService.post(submitGateway).subscribe(data => {
        this.notificationService.showMessage('Gateway created successfully!');
        this.router.navigate([`/pages/corporation/gateway`]);
      });
    }
  }
}
