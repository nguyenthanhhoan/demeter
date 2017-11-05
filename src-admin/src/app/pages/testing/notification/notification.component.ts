import { Component, NgZone, OnInit } from '@angular/core';
import { TestingService } from '../testing.service';
import { NotificationService } from '../../../_core/services/notification.service';

@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  notification: any = {};
  constructor(private testingService: TestingService,
              private notificationService: NotificationService) { }

  submit() {
    this.testingService.createNotification(this.notification)
    .subscribe(() => {
      this.notificationService.showMessage('Notification created successfully!');
    })
  }
}
