import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CameraService } from '../../../core/services/camera.service';

@Component({
  templateUrl: './zone-camera.component.html',
  styleUrls: ['./zone-camera.component.css']
})
export class ZoneCameraComponent implements OnInit {

  cameras: any[] = [];

  constructor(private store: Store<any>,
              private cameraService: CameraService) {

  }

  ngOnInit() {
    let needToLoad = true;
    this.store.select('zone')
    .takeWhile((zoneModel: any) => {
      return (needToLoad);
    })
    .subscribe((zoneModel) => {
      if (zoneModel.loaded) {
        let { zone } = zoneModel;
        this.cameras = zone.cameras;
        needToLoad = false;
      }
    });
  }
}
