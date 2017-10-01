import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CameraService } from '../../../../core/api/services/camera.service';

@Component({
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {
  cameras: any = [];
  @ViewChild('cameraModal') public cameraModal: any;
  private project_id;
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private deviceService: DeviceService,
              private cameraService: CameraService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project_id = app.project.id;
        this.loadCameras();
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  loadCameras() {
    this.cameraService.getCameras(this.project_id)
    .subscribe((cameras) => {
      this.cameras = cameras;
    });
  }

  addCamera() {
    this.cameraModal.open()
    .subscribe(() => {
      this.loadCameras();
    });
  }

  editCamera(camera) {
    this.cameraModal.open(camera)
    .subscribe(() => {
      this.loadCameras();
    });
  }

  remove(camera) {
    this.notificationService.confirm('Do you want to remove this camera?')
    .subscribe(() => {
      this.cameraService.delete(camera.id)
      .subscribe(() => {
        this.notificationService.showMessage('Camera was removed successfully!');
        this.loadCameras();
      });
    });
  }
}
