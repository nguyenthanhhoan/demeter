import { Component, NgZone, OnInit } from '@angular/core';
import { TestingService } from '../testing.service';
import { NotificationService } from '../../../_core/services/notification.service';

@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  alert: any = {};
  constructor(private testingService: TestingService,
              private notificationService: NotificationService) { }

  submit() {
    this.testingService.triggerAlert(this.alert.uuid)
    .subscribe(() => {
      this.notificationService.showMessage('Alert triggered successfully!');
    })
  }
}
