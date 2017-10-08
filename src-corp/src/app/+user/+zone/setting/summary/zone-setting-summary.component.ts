import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { DeviceFieldService } from '../../../../core/services/device-field-service';
import { ZoneService } from '../../../../core/services/zone.service';

@Component({
  selector: 'zone-setting-summary',
  templateUrl: './zone-setting-summary.component.html',
  styleUrls: ['./zone-setting-summary.component.css']
})
export class ZoneSettingSummaryComponent implements DoCheck {

  @Input()
  zone: any;

  @Output() onRefresh = new EventEmitter();

  oldZone: any = {};
  project_id: number;
  zone_id: number;

  setting: any = {};

  cameras = [];

  constructor(private store: Store<any>,
              private notificationService: NotificationService,
              private deviceFieldService: DeviceFieldService,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zone_id);
    })
    .subscribe((zoneModel: any) => {
      this.zone_id = zoneModel.zoneId;
      this.project_id = zoneModel.projectId;
    });
  }

  updateSetting() {
    this.zoneService.updateSetting(this.zone_id, {
      setting: JSON.stringify(this.setting)
    }).subscribe(() => {
      this.notificationService.showMessage('Setting updated!');
    });
  }

  reloadZone() {
    this.onRefresh.emit({});
  }

  ngDoCheck() {
    let changeDetected = false;
    if (this.zone && this.zone.id && this.oldZone.id !== this.zone.id) {
      changeDetected = true;
    }

    if (this.zone && this.zone.id &&
      !_.isEqual(this.zone.cameras_zones, this.oldZone.cameras_zones)) {

      changeDetected = true;
    }

    if (changeDetected) {
      this.oldZone = {
        id: this.zone.id,
        cameras_zones: [...this.zone.cameras_zones]
      };
      this.setting = Object.assign({}, this.zone.setting);
      this.buildQuickViewCamera();
    }
  }

  buildQuickViewCamera() {
    this.cameras = [];
    let quickViewCameras = this.zone.cameras_zones.filter((camera) => {
      return camera.is_primary;
    });

    quickViewCameras.forEach((camera_zone, index) => {
      let camera = this.zone.cameras.find((loop_camera) => {
        return loop_camera.id === camera_zone.camera_id;
      });
      this.cameras.push({
        id: camera_zone.id,
        no: index + 1,
        name: camera.camera_name,
        camera_id: camera_zone.camera_id
      });
    });
  }

  unAssignQuickViewCamera(camera) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Camera?'
    }, () => {
      this.zoneService.unAssignQuickViewCamera(this.zone_id, camera.camera_id)
      .subscribe((data) => {
        this.notificationService.showMessage('Remove camera successfully!');
        this.reloadZone();
      });
    });
  }
}
