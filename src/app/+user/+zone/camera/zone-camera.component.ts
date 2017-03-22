import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ZoneService } from '../../../core/services/zone.service';

@Component({
  templateUrl: './zone-camera.component.html',
  styleUrls: ['./zone-camera.component.css']
})
export class ZoneCameraComponent implements OnInit {

  cameras: any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
    this.cameras = [{
      id: 1,
      name: "Camera 1"
    }, {
      id: 1,
      name: "Camera 2"
    }, {
      id: 1,
      name: "Camera 3"
    }, {
      id: 1,
      name: "Camera 4"
    }, {
      id: 1,
      name: "Camera 5"
    }];
  }
}
