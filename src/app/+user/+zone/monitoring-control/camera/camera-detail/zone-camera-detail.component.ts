import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CameraService } from '../../../../core/services/camera.service';

declare var flowplayer: any;

@Component({
  templateUrl: './zone-camera-detail.component.html',
  styleUrls: ['./zone-camera-detail.component.css']
})
export class ZoneCameraDetailComponent implements OnInit {

  camera: any;
  filter: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cameraService: CameraService) {

    this.filter = {};
  }

  ngOnInit() {
    let camera_id = +this.route.snapshot.params['camera_id'];
    this.cameraService.getOne(camera_id)
    .subscribe(data => {
      this.camera = data;
    });
  }

}
