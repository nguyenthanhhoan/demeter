import * as events from 'events';
import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

import * as _ from 'lodash';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { AppSettings } from '../../../../../app.settings';

declare var moment: any;
@Component({
  selector: 'okr-configure-modal',
  templateUrl: './okr-configure-modal.component.html',
  styleUrls: ['./okr-configure-modal.component.css']
})
export class OKRConfigureModalComponent implements OnInit, OnChanges, DoCheck {

  okrList: any[];
  okrs_bak: any[];

  @Input() okrs: any[];
  @ViewChild('okrConfigureModal') public okrConfigureModal: ModalDirective;
  @Output() onResolve = new EventEmitter();

  newOKRName: String = '';

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    if (this.okrs) {
      this.initOKRList();
    }
  }

  ngOnChanges() {
    if (this.okrs) {
      this.initOKRList();
      this.okrs_bak = [...this.okrs];
    }
  }

  ngDoCheck() {
    let changeDetected = false;
    if (this.okrs && this.okrs.length
      && this.okrs_bak && this.okrs_bak.length) {

      if (this.okrs.length !== this.okrs_bak.length) {
        changeDetected = true;
      } else {
        this.okrs.forEach((element, index) => {
          if (this.okrs[index].name !== this.okrs_bak[index].name) {
            changeDetected = true;
          }
        });
      }
    }
    if (changeDetected) {
      this.initOKRList();
      this.okrs_bak = [...this.okrs];
    }
  }

  initOKRList() {
    this.okrList = [];
    this.okrs.forEach((okr) => {
      this.okrList.push({
        id: okr.id,
        content: okr.name
      });
    });
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
    this.okrList.forEach((element, index) => {
      if (element.isNew) {
        this.okrs.splice(index, 0, {
          id: element.id,
          order: index,
          name: element.content
        });
      } else {
        let foundEle = this.okrs.find((okr) => {
          return okr.id === element.id;
        });
        if (foundEle) {
          foundEle.order = index;
        } else {
          console.error('Cannot find element', element);
        }
      }
    });
    this.onResolve.emit(this.okrs);
    this.okrConfigureModal.hide();
  }
}
