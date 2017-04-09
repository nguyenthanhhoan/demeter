import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { NotificationService } from "../../../shared/utils/notification.service";
import { ZoneService } from '../../../core/services/zone.service';

@Component({
  selector: 'zone-setting-summary',
  templateUrl: './zone-setting-summary.component.html',
  styleUrls: ['./zone-setting-summary.component.css']
})
export class ZoneSettingSummaryComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  project_id: number;

  setting: {} = {}

  inputs = [{
    no: 1,
    name: 'Temperature',
    input: 'B1 - Sensor 1'
  }, {
    no: 2,
    name: 'Humidity',
    input: 'B1 - Sensor 2'
  }, {
    no: 3,
    name: 'Light',
    input: 'B1 - Sensor 3'
  }]

  cameras = [{
    no: 1,
    name: 'Camera Live 1'
  }, {
    no: 2,
    name: 'Camera Live 2'
  }, {
    no: 3,
    name: 'Camera Live 3'
  }]

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
  }

  updateSetting() {
    let project_id = +this.route.snapshot.params['project_id'];
    let id = +this.route.snapshot.params['id'];
    this.zoneService.updateSetting(project_id, id, {
      setting: JSON.stringify(this.setting)
    }).subscribe(() => {
      this.notificationService.showMessage('Setting updated!');
    });;
  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.oldZone = this.zone;
      this.setting = this.zone.setting;
    }
  }
}
