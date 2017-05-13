import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { OkrObjectiveService } from '../../../../../core/services/okr-objective.service';

declare var moment: any;
@Component({
  selector: 'okr-table',
  templateUrl: './okr-table.component.html',
  styleUrls: ['./okr-table.component.css']
})
export class OKRTableComponent {

  @Input()
  objectives: any[];
  @Output()
  onRemoveObjective = new EventEmitter();

  constructor(private notificationService: NotificationService,
              private okrObjectiveService: OkrObjectiveService) {
  }

  removeObjective(objective) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Objective?'
    }, () => {
      this.okrObjectiveService.delete(objective.id)
      .subscribe(() => {
        this.onRemoveObjective.emit(objective);
      });
    });
  }
}
