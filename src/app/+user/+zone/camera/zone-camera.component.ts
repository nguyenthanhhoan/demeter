import { ISubscription } from 'rxjs/Subscription';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CameraService } from '../../../core/services/camera.service';

@Component({
  templateUrl: './zone-camera.component.html',
  styleUrls: ['./zone-camera.component.css']
})
export class ZoneCameraComponent implements OnInit, OnDestroy {

  cameras: any[] = [];
  canEdit: boolean = false;
  private zoneSubscription: ISubscription;
  private userRole: string;

  constructor(private store: Store<any>,
              private cameraService: CameraService) {

  }

  ngOnInit() {
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        let { zone } = zoneModel;
        this.cameras = zone.cameras;
        this.userRole = zoneModel.zone.current_user_role;
        this.checkPermission();
      }
    });
  }

  ngOnDestroy() {
    this.zoneSubscription.unsubscribe();
  }

  checkPermission() {
    if (this.userRole === 'user' || this.userRole === 'guest') {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
  }
}
