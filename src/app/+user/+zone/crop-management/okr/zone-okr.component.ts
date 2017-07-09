import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Chartist from 'chartist';
import { ModalDirective } from 'ng2-bootstrap';
import * as _ from 'lodash';

import { AppUtils } from '../../../../app.utils';

import { ZoneService } from '../../../../core/services/zone.service';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { OkrService } from '../../../../core/services/okr.service';
import { OkrObjectiveService } from '../../../../core/services/okr-objective.service';

@Component({
  templateUrl: './zone-okr.component.html',
  styleUrls: ['./zone-okr.component.css']
})
export class ZoneOKRComponent implements OnInit {

  @ViewChild('okrTableFormModal') public okrTableFormModal: ModalDirective;
  @ViewChild('objectiveAddModal') public objectiveAddModal: ModalDirective;

  zone: any;
  zone_id: number;
  okr_tabs: any[];
  activeORKTab: any = {};

  okrTab: any = {};
  objective: any = {};

  constructor(private router: Router,
              private store: Store<any>,
              private route: ActivatedRoute,
              private zoneService: ZoneService,
              private okrService: OkrService,
              private notificationService: NotificationService,
              private okrObjectiveService: OkrObjectiveService) {

  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zone_id);
    })
    .subscribe((zoneModel: any) => {
      this.zone_id = zoneModel.zoneId;
      this.loadOKR();
    });
  }

  removeTab(event, ork_tab) {
    event.stopPropagation();
    this.notificationService.confirmBox({
      content: 'Do you want ot remove this Tab?'
    }, () => {
      this.okrService.delete(ork_tab.id)
      .subscribe(() => {
        let index = this.okr_tabs.indexOf(ork_tab);
        this.okr_tabs.splice(index, 1);
      });
    });
  }

  loadOKR() {
    this.okrService.getList(this.zone_id)
      .subscribe((okr_tabs) => {
        this.okr_tabs = okr_tabs;
        this.sortOKRTab();
        if (this.activeORKTab.id) {
          // Should map new activeORKTab by id
          this.activeORKTab = this.okr_tabs.find((orkTab) => {
            return orkTab.id === this.activeORKTab.id;
          });
        } else {

          // Select first okr_tab as default
          if (this.okr_tabs.length > 0) {
            this.activeORKTab = this.okr_tabs[0];
          }
        }
      });
  }

  openAddOKRTable() {
    this.okrTab = {};
    this.okrTableFormModal.show();
  }

  openAddObjective() {
    this.objective = {};
    this.objectiveAddModal.show();
  }

  createOKRTable() {
    this.okr_tabs.push({
      id: (new Date()).getTime(),
      name: this.okrTab.name
    });
    this.okrTab = {};
    this.okrTableFormModal.hide();
  }

  createObjetive() {
    let okr_id = this.activeORKTab.id;
    this.okrObjectiveService.post({
      okr_id: okr_id,
      date_from: AppUtils.getSubmitDate(this.objective.date_from),
      date_to: AppUtils.getSubmitDate(this.objective.date_to),
      objective: this.objective.objective
    })
    .subscribe(() => {
      this.objective = {};
      this.objectiveAddModal.hide();
      this.loadOKR();
    });
  }

  removeObjective(objective) {
    let index = this.activeORKTab.objectives.indexOf(objective);
    this.activeORKTab.objectives.splice(index, 1);
    this.notificationService.showMessage('Remove objective successfully!');
  }

  okrConfigureResolve() {
    this.loadOKR();
  }

  okrRenameResolve(okrs) {
    okrs.forEach((element, index) => {
      this.okr_tabs[index].name = element.name;
    });
  }

  sortOKRTab() {
    this.okr_tabs = _.sortBy(this.okr_tabs, ['order']);
  }
}
