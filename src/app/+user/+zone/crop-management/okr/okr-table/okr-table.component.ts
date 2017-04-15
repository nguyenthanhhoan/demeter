import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationService } from "../../../../../shared/utils/notification.service";
import { AppSettings } from '../../../../../app.settings';

declare var moment: any;
@Component({
  selector: 'okr-table',
  templateUrl: './okr-table.component.html',
  styleUrls: ['./okr-table.component.css']
})
export class OKRTableComponent {

  @Input()
  objectives: any[]
  @Output()
  onRemoveObjective = new EventEmitter();

  constructor(private notificationService: NotificationService) {
  }

  removeObjective(objective) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Objective?'
    }, () => {
      this.onRemoveObjective.emit(objective);
    })
  }
}
