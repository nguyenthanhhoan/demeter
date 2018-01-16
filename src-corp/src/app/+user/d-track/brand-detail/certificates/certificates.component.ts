import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { NotificationService } from 'app/shared/utils/notification.service';

declare var moment: any;

@Component({
  selector: 'certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {

  fakeInage: any = {path: 'path' };
  @Input()
  brand: any;

  constructor(private router: Router,
              private notificationService: NotificationService) {
  }

  onRemove(item) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this Image?`
    }, () => {

      this.notificationService.showMessage(`Remove Image successfully!`);
    });
  }
}
