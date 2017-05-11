import * as events from 'events';
import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { AppSettings } from '../../../../../app.settings';
import { OkrService } from '../../../../../core/services/okr.service';

declare var moment: any;
@Component({
  selector: 'okr-rename-modal',
  templateUrl: './okr-rename-modal.component.html',
  styleUrls: ['./okr-rename-modal.component.css']
})
export class OKRRenameModalComponent implements OnChanges {

  zone_id: number;
  @Input() okrs: any[];
  @ViewChild('okrRenameModal') public okrRenameModal: ModalDirective;
  @Output() onResolve = new EventEmitter();

  okrList: any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private okrService: OkrService) {
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnChanges() {
    if (this.okrs) {
      this.okrList = [];
      this.okrs.forEach((element) => {
        this.okrList.push({
          id: element.id,
          name: element.name
        });
      });
    }
  }

  show() {
    this.okrRenameModal.show();
  }

  save() {
    let submit_okrs = [];
    this.okrList.forEach((element, index) => {
      submit_okrs.push({
        id: element.id,
        name: element.name
      });
    });
    this.okrService.update_batch(this.zone_id, {
      okrs: submit_okrs
    })
    .subscribe(() => {
      this.onResolve.emit(this.okrList);
      this.okrRenameModal.hide();
    });
  }
}
