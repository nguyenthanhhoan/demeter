import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

declare var flowplayer: any;

@Component({
  templateUrl: './zone-camera-detail.component.html',
  styleUrls: ['./zone-camera-detail.component.css']
})
export class ZoneCameraDetailComponent implements OnInit {

  camera: any;
  filter: any;

  constructor(private router: Router,
              private route: ActivatedRoute) {

    this.filter = {};
  }

  ngOnInit() {
    this.camera = {
      name: "Camera 1",
      source: "http://04c2.vp9.tv:2229/chn/DMT11/v.m3u8"
    };
  }

}
