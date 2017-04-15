import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';
import { ModalDirective } from "ng2-bootstrap";

import { ZoneService } from '../../../../core/services/zone.service';

@Component({
  templateUrl: './zone-okr.component.html',
  styleUrls: ['./zone-okr.component.css']
})
export class ZoneOKRComponent implements OnInit {

  @ViewChild('okrTableFormModal') public okrTableFormModal:ModalDirective
  @ViewChild('objectiveAddModal') public objectiveAddModal:ModalDirective

  persons: any[] = [{
    id: 1,
    name: 'Nguyen Van A'
  }, {
    id: 2,
    name: 'Tran Thi B'
  }]
  
  zone: any;
  okr_tabs: any[]
  activeORKTab: any = {};

  okrTab: any = {}
  objective: any = {}

  constructor(private router: Router,
    private route: ActivatedRoute,
    private zoneService: ZoneService) {

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];

    this.zoneService.getOKRData(project_id, id)
      .subscribe((okr_tabs) => {
        console.log('okr_tabs', okr_tabs);
        this.okr_tabs = okr_tabs;
        this.activeORKTab = this.okr_tabs[0];
      })
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
      time: this.objective.time,
      objective: this.objective.objective,
      key_results: []
    });
    this.objective = {};
    this.objectiveAddModal.hide();
  }
}
