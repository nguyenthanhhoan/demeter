import { Component, OnInit, DoCheck, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  project_id: number;
  zone_id: number;
  isRequesting = false;

  cameras = [];
  selectedCamera: any;

  @ViewChild('modal') public modal: ModalDirective;

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
    this.zoneService.assignCamera(this.project_id, this.zone_id, this.selectedCamera.id)
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
    this.zoneService.assignQuickViewCamera(this.project_id, this.zone_id, this.selectedCamera.id)
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
