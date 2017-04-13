import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ModalDirective } from "ng2-bootstrap";

import { NotificationService } from "../../../../../shared/utils/notification.service";
import { ZoneService } from '../../../../../core/services/zone.service';
import { CameraService } from '../../../../../core/services/camera.service';

declare var moment: any;
@Component({
  selector: 'zone-daily-report-harvesting',
  templateUrl: './zone-daily-report-harvesting.component.html',
  styleUrls: ['./zone-daily-report-harvesting.component.css']
})
export class ZoneDailyReportHarvestingComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  project_id: number;
  zone_id: number;

  harvesting_reports = [{
    name: 'Lettuce',
    type: 'Romain',
    quantity: 1000,
    cost: 200,
    note: 'Veggetables'
  }, {
    name: 'Lettuce',
    type: 'BB',
    quantity: 1000,
    cost: 200
  }, {
    name: 'Lettuce',
    type: 'CC',
    quantity: 1000,
    cost: 200
  }, {
    name: 'Lettuce',
    type: 'DD',
    quantity: 1000,
    cost: 200
  }]

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private cameraService: CameraService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.oldZone = this.zone;
    }
  }
}
