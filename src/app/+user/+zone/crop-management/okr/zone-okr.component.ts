import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';
import { ModalDirective } from 'ng2-bootstrap';
import * as _ from 'lodash';

import { ZoneService } from '../../../../core/services/zone.service';
import { NotificationService } from '../../../../shared/utils/notification.service';

@Component({
  templateUrl: './zone-okr.component.html',
  styleUrls: ['./zone-okr.component.css']
})
export class ZoneOKRComponent implements OnInit {

  @ViewChild('okrTableFormModal') public okrTableFormModal: ModalDirective;
  @ViewChild('objectiveAddModal') public objectiveAddModal: ModalDirective;

  persons: any[] = [{
    id: 1,
    name: 'Nguyen Van A'
  }, {
    id: 2,
    name: 'Tran Thi B'
  }];
  zone: any;
  okr_tabs: any[];
  activeORKTab: any = {};

  okrTab: any = {};
  objective: any = {};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private notificationService: NotificationService) {

  }

  removeTab(event, ork_tab) {
    event.stopPropagation();
    this.notificationService.confirmBox({
      content: 'Do you want ot remove this Tab?'
    }, () => {
      let index = this.okr_tabs.indexOf(ork_tab);
      this.okr_tabs.splice(index, 1);
    });
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];

    this.zoneService.getOKRData(project_id, id)
      .subscribe((okr_tabs) => {
        this.okr_tabs = okr_tabs;
        this.activeORKTab = this.okr_tabs[0];
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
    this.activeORKTab.objectives.push({
      id: (new Date()).getTime(),
      start_date: this.objective.start_date,
      end_date: this.objective.end_date,
      objective: this.objective.objective,
      key_results: []
    });
    this.objective = {};
    this.objectiveAddModal.hide();
  }

  removeObjective(objective) {
    let index = this.activeORKTab.objectives.indexOf(objective);
    this.activeORKTab.objectives.splice(objective, 1);
    this.notificationService.showMessage('Remove objective successfully!');
  }

  okrConfigureResolve(okrs) {
    this.okr_tabs = _.sortBy(okrs, ['order']);
  }

  okrRenameResolve(okrs) {
    okrs.forEach((element, index) => {
      this.okr_tabs[index].name = element.name;
    });
  }
}
