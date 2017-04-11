import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ModalDirective } from "ng2-bootstrap";

import { NotificationService } from "../../../../shared/utils/notification.service";
import { ZoneService } from '../../../../core/services/zone.service';
import { CameraService } from '../../../../core/services/camera.service';

@Component({
  selector: 'zone-setting-camera',
  templateUrl: './zone-setting-camera.component.html',
  styleUrls: ['./zone-setting-camera.component.css']
})
export class ZoneSettingCameraComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  project_id: number;
  zone_id: number;
  isRequesting = false;

  setting: {} = {}

  cameras = []

  all_cameras = []
  selectedCamera: any;

  @ViewChild('lgModal') public lgModal:ModalDirective

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private cameraService: CameraService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.cameraService.getList().subscribe((cameras) => {
      this.all_cameras = cameras;
    });
  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.oldZone = this.zone;
      this.setting = this.zone.setting;
      this.cameras = this.zone.cameras;
    }
  }

  onSelectCamera() {
    this.isRequesting = true;
    if (this.selectedCamera) {
      this.zoneService.assignCamera(this.project_id, this.zone_id, this.selectedCamera.id)
      .subscribe((data) => {
        this.isRequesting = false;
        this.lgModal.hide();
        this.notificationService.showMessage('Assign camera successfully!');
        this.reloadZone();
      }, (error) => {
        this.isRequesting = false;
      })
    }
  }

  unAssignCamera(camera) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Camera?'
    }, () => {
      this.zoneService.unAssignCamera(this.project_id, this.zone_id, camera.id)
      .subscribe((data) => {
        this.notificationService.showMessage('Remove camera successfully!');
        this.reloadZone();
      })
    })
  }

  reloadZone() {
    this.zoneService.getOne(this.project_id, this.zone_id)
      .subscribe((zone) => {
        this.zone = zone;
        this.oldZone = this.zone;
        this.setting = this.zone.setting;
        this.cameras = this.zone.cameras;
      })
  }
}
