import { Component, OnInit, DoCheck, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ng2-bootstrap';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { ZoneService } from '../../../../core/services/zone.service';
import { CameraService } from '../../../../core/services/camera.service';

@Component({
  selector: 'camera-select-modal',
  templateUrl: './camera-select-modal.component.html'
})
export class CameraSelectModalComponent implements OnInit {

  @Input() mode: string;

  @Output() onResolve = new EventEmitter();

  projectId: number;
  zoneId: number;
  isRequesting = false;

  cameras = [];
  selectedCamera: any;

  @ViewChild('modal') public modal: ModalDirective;

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
      this.cameras = cameras;
    });
  }

  onSelectCamera() {
    this.isRequesting = true;
    if (this.mode === 'assign_camera_to_zone') {
      this.assignCamera();
    } else if (this.mode === 'assign_quick_view') {
      this.assignQuickView();
    }
  }

  assignCamera() {
    this.zoneService.assignCamera(this.projectId, this.zoneId, this.selectedCamera.id)
    .subscribe((data) => {
      this.isRequesting = false;
      this.modal.hide();
      this.notificationService.showMessage('Assign camera successfully!');
      this.onResolve.emit();
    }, (error) => {
      this.isRequesting = false;
    });
  }

  assignQuickView() {
    this.zoneService.assignQuickViewCamera(this.projectId, this.zoneId, this.selectedCamera.id)
    .subscribe((data) => {
      this.isRequesting = false;
      this.modal.hide();
      this.notificationService.showMessage('Assign camera successfully!');
      this.onResolve.emit();
    }, (error) => {
      this.isRequesting = false;
    });
  }

  show() {
    this.modal.show();
  }
}
