import * as events from 'events';
import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild
} from '@angular/core';

import * as _ from 'lodash';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { AppSettings } from '../../../../../app.settings';

declare var moment: any;
@Component({
  selector: 'okr-rename-modal',
  templateUrl: './okr-rename-modal.component.html',
  styleUrls: ['./okr-rename-modal.component.css']
})
export class OKRRenameModalComponent implements OnChanges {

  @Input() okrs: any[];
  @ViewChild('okrRenameModal') public okrRenameModal: ModalDirective;
  @Output() onResolve = new EventEmitter();

  okrList: any[];

  constructor(private notificationService: NotificationService) {
  }

  ngOnChanges() {
    if (this.okrs) {
      this.okrList = [];
      this.okrs.forEach((element) => {
        this.okrList.push({
          name: element.name
        });
      });
    }
  }

  show() {
    this.okrRenameModal.show();
  }

  save() {
    this.onResolve.emit(this.okrList);
    this.okrRenameModal.hide();
  }
}
