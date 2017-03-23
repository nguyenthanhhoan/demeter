import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { CameraService } from '../../../core/services/camera.service';

@Component({
  templateUrl: './zone-camera.component.html',
  styleUrls: ['./zone-camera.component.css']
})
export class ZoneCameraComponent implements OnInit {

  cameras: any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cameraService: CameraService) {

  }

  ngOnInit() {
    this.cameraService.getList()
    .subscribe(data => {
      this.cameras = data;
    })
  }
}
