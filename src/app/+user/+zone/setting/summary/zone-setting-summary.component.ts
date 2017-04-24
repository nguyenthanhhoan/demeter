import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';

import { NotificationService } from '../../../../shared/utils/notification.service';
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

  setting: {} = {};

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
  }];

  cameras = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  updateSetting() {
    let project_id = +this.route.snapshot.params['project_id'];
    let id = +this.route.snapshot.params['id'];
    this.zoneService.updateSetting(project_id, id, {
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
      this.zoneService.unAssignQuickViewCamera(this.project_id, this.zone_id, camera.camera_id)
      .subscribe((data) => {
        this.notificationService.showMessage('Remove camera successfully!');
        this.reloadZone();
      });
    });
  }
}
