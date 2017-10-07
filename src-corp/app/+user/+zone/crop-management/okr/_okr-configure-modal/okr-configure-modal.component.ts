import { ActivatedRoute, Router } from '@angular/router';
import * as events from 'events';
import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { AppSettings } from '../../../../../app.settings';
import { OkrService } from '../../../../../core/services/okr.service';

declare var moment: any;
@Component({
  selector: 'okr-configure-modal',
  templateUrl: './okr-configure-modal.component.html',
  styleUrls: ['./okr-configure-modal.component.css']
})
export class OKRConfigureModalComponent implements OnInit, OnChanges, DoCheck {

  okrList: any[];
  okrs_old: any[];
  zone_id: number;
  sortableList: any;

  @Input() okrs: any[];
  @ViewChild('okrConfigureModal') public okrConfigureModal: ModalDirective;
  @Output() onResolve = new EventEmitter();

  newOKRName: String = '';
  isRequesting = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>,
              private notificationService: NotificationService,
              private okrService: OkrService) {
  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zone_id);
    })
    .subscribe((zoneModel: any) => {
      this.zone_id = zoneModel.zoneId;
      if (this.okrs) {
        this.initOKRList();
      }
    });
  }

  ngOnChanges() {
    if (this.okrs) {
      this.initOKRList();
      this.okrs_old = this.cloneORKs(this.okrs);
    }
  }

  ngDoCheck() {
    let changeDetected = false;
    if (this.okrs && this.okrs.length
      && this.okrs_old && this.okrs_old.length) {

      if (this.okrs.length !== this.okrs_old.length) {
        changeDetected = true;
      } else {
        this.okrs.forEach((element, index) => {
          if (this.okrs[index].name !== this.okrs_old[index].name) {
            changeDetected = true;
          }
        });
      }
    }
    if (changeDetected) {
      this.initOKRList();
      this.okrs_old = this.cloneORKs(this.okrs);
    }
  }

  cloneORKs(okrs) {
    let cloneORKs = [];
    this.okrs.forEach((okr) => {
      cloneORKs.push({
        id: okr.id,
        name: okr.name,
        order: okr.order
      });
    });
    return cloneORKs;
  }

  initOKRList() {
    this.okrList = [];
    this.okrs.forEach((okr) => {
      this.okrList.push({
        id: okr.id,
        content: okr.name
      });
    });

    // Render UI of nestable-list
    if (this.sortableList) {
      this.sortableList.render();
    }
  }

  onChangeList(event) {
    event.forEach((element, index) => {
      let foundEle = this.okrList.find((okr) => {
        return okr.id === element.id;
      });
      if (foundEle) {
        foundEle.order = index;
      } else {
        console.error('Cannot find element', element);
      }
    });
    this.okrList = _.sortBy(this.okrList, ['order']);
  }

  addOKR(newOKRName) {
    let id = (new Date()).getTime();
    let order = this.okrList.length;
    this.okrList.push({
      id: id,
      isNew: true,
      content: newOKRName,
      order: order
    });
    this.newOKRName = '';
  }

  show() {
    this.okrConfigureModal.show();
  }

  save() {
    let submit_okrs = [];
    this.okrList.forEach((element, index) => {
      let submit_okr: any = {
        zone_id: this.zone_id,
        order: index,
        name: element.content
      };
      if (!element.isNew) {
        submit_okr.id = element.id;
      }
      submit_okrs.push(submit_okr);
    });

    this.isRequesting = true;
    this.okrService.update_batch(this.zone_id, {
      okrs: submit_okrs
    })
    .subscribe(() => {
      this.onResolve.emit();
      this.okrConfigureModal.hide();
      this.isRequesting = false;
    }, () => {
      this.isRequesting = false;
    });
  }
}
