import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { ZoneService } from '../../../../core/services/zone.service';
import { CameraService } from '../../../../core/services/camera.service';

@Component({
  selector: 'zone-setting-camera',
  templateUrl: './zone-setting-camera.component.html',
  styleUrls: ['./zone-setting-camera.component.css']
})
export class ZoneSettingCameraComponent implements OnInit, DoCheck {

  @Input() zone: any;
  @Output() onRefresh = new EventEmitter();

  oldZone: any = {};
  projectId: number;
  zoneId: number;

  cameras = [];

  all_cameras = [];

  constructor(private store: Store<any>,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private cameraService: CameraService) {

  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zoneId);
    })
    .subscribe((zoneModel: any) => {
      this.zoneId = zoneModel.zoneId;
      this.projectId = zoneModel.projectId;
      this.load();
    });
  }

  load() {
    this.cameraService.getList().subscribe((cameras) => {
      this.all_cameras = cameras;
    });
  }

  ngDoCheck() {
    let changeDetected = false;
    if (this.zone && this.zone.id && this.oldZone.id !== this.zone.id) {
      changeDetected = true;
    }

    if (this.zone && this.zone.id &&
      !_.isEqual(this.zone.cameras, this.oldZone.cameras)) {

      changeDetected = true;
    }

    if (changeDetected) {
      this.oldZone = {
        id: this.zone.id
      };
      this.cameras = [...this.zone.cameras];
    }
  }

  unAssignCamera(camera) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Camera?'
    }, () => {
      this.zoneService.unAssignCamera(this.projectId, this.zoneId, camera.id)
      .subscribe((data) => {
        this.notificationService.showMessage('Remove camera successfully!');
        this.reloadZone();
      });
    });
  }

  reloadZone() {
    this.onRefresh.emit({});
  }
}
