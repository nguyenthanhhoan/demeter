import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ModalDirective } from "ng2-bootstrap";

import { NotificationService } from "../../../../../shared/utils/notification.service";
import { ZoneService } from '../../../../../core/services/zone.service';
import { CameraService } from '../../../../../core/services/camera.service';
import { MockDataService } from '../../../../../core/services/mock-data.service';

declare var moment: any;
@Component({
  selector: 'zone-daily-report-environment',
  templateUrl: './zone-daily-report-environment.component.html',
  styleUrls: ['./zone-daily-report-environment.component.css']
})
export class ZoneDailyReportEnvironmentComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  project_id: number;
  zone_id: number;
  charts: any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private cameraService: CameraService,
              private mockDataService: MockDataService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {

  }

  initData() {
    //TODO: Refactor later
    let stats = this.mockDataService.initStat(30);
    this.charts = [{
      title: 'Temperature 24H',
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.temp]
      },
      options: stats.options
    }, {
      title: 'EC 24H',
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.humid]
      },
      options: stats.options
    }, {
      title: 'Soil Moisture 24H',
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.light]
      },
      options: stats.options
    }, {
      title: 'CO2 24H',
      type: 'Line',
      data: {
        label: stats.labels,
        series: [stats.data.pressure]
      },
      options: stats.options
    }];
  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.oldZone = this.zone;
    }
  }
}
