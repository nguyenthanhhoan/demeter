import { Component, OnInit, AfterViewInit, Input, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';
import { SensorDataChartComponent } from '../../shared/sensor-data-chart/sensor-data-chart.component';

@Component({
  templateUrl: './zone-summary.component.html',
  styleUrls: ['./zone-summary.component.css']
})
export class ZoneSummaryComponent implements OnInit, AfterViewInit {

  zone: any = {};
  project: {} = {};
  setting: {} = {};
  project_id: number;
  zone_id: number;
  cameraQuickViews = [];

  @ViewChildren('environmentChart')
  private environmentChart;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {
  }

  ngOnInit() {
    let zone_id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];
    this.zoneService.getOne(project_id, zone_id).subscribe(data => {
      Object.assign(this.zone, data);
      Object.assign(this.project, this.zone.project);
      Object.assign(this.setting, this.zone.setting);
      this.buildCameraQuickView();
    });
  }

  buildCameraQuickView() {
    this.zone.cameras_zones.forEach((camera_zone) => {
      if (camera_zone.is_primary) {
        let camera = this.zone.cameras.find((loopCamera) => {
          return loopCamera.id === camera_zone.camera_id;
        });
        if (camera) {
          this.cameraQuickViews.push(camera);
        }
      }
    });
  }

  ngAfterViewInit() {
    this.environmentChart.changes.subscribe(item => {
      if (this.environmentChart.toArray().length) {
        this.environmentChart.toArray().forEach(element => {
          element.initData();
        });
      }
    });
  }
}
