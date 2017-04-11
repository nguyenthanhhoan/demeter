import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { CameraService } from '../../../core/services/camera.service';
import { ZoneService } from '../../../core/services/zone.service';

@Component({
  templateUrl: './zone-camera.component.html',
  styleUrls: ['./zone-camera.component.css']
})
export class ZoneCameraComponent implements OnInit {

  zone: any = {};
  cameras: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cameraService: CameraService,
              private zoneService: ZoneService) {

  }

  ngOnInit() {

    let zone_id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];
    this.zoneService.getOne(project_id, zone_id).subscribe(data => {
      Object.assign(this.zone, data);
      Object.assign(this.cameras, data.cameras);
    });
  }
}
