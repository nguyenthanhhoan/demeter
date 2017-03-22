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
      name: "Camera 1",
      source: "http://04c2.vp9.tv:2229/chn/DMT11/v.m3u8"
    }, {
      id: 1,
      name: "Camera 2",
      source: "http://04c2.vp9.tv:2229/chn/DMT11/v.m3u8"
    }, {
      id: 1,
      name: "Camera 3",
      source: "http://04c2.vp9.tv:2229/chn/DMT11/v.m3u8"
    }, {
      id: 1,
      name: "Camera 4",
      source: "http://04c2.vp9.tv:2229/chn/DMT11/v.m3u8"
    }, {
      id: 1,
      name: "Camera 5",
      source: "http://04c2.vp9.tv:2229/chn/DMT11/v.m3u8"
    }];
  }
}
