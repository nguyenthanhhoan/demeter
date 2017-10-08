import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ZoneService } from '../../../core/services/zone.service';
import {
  SensorDataChartComponent
} from '../../shared/sensor-data-chart/sensor-data-chart.component';

@Component({
  templateUrl: './zone-summary.component.html',
  styleUrls: ['./zone-summary.component.css']
})
export class ZoneSummaryComponent implements OnInit, OnDestroy, AfterViewInit {

  zone: any = {};
  project: any = {};
  setting: any = {};
  project_id: number;
  zone_id: number;
  cameraQuickViews = [];
  private viewSubscription: ISubscription;
  private storeSubscription: ISubscription;

  @ViewChildren('environmentChart')
  private environmentChart;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.storeSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.zone && zoneModel.zone.id) {
        this.zone = zoneModel.zone;
        this.project = this.zone.project;
        this.setting = this.zone.setting;
        this.buildCameraQuickView();
      }
    });
  }

  ngOnDestroy() {
    this.viewSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

  buildCameraQuickView() {
    this.cameraQuickViews = [];
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
    this.viewSubscription = this.environmentChart.changes.subscribe(item => {
      if (this.environmentChart.toArray().length) {
        this.environmentChart.toArray().forEach(element => {
          element.initData();
        });
      }
    });
    if (this.environmentChart.toArray().length) {
      this.environmentChart.toArray().forEach(element => {
        element.initData();
      });
    }
  }
}
