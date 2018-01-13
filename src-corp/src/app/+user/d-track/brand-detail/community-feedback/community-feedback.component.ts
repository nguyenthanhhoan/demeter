import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { NotificationService } from '../../../../shared/utils/notification.service';

declare var moment: any;

@Component({
  selector: 'community-feedback',
  templateUrl: './community-feedback.component.html',
  styleUrls: ['./community-feedback.component.scss']
})
export class CommunityFeedbackComponent {
  constructor(private router: Router, private notificationService: NotificationService) {
  }

  remove(item, type) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this ${type} ?`
    });
  }
}
