import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  templateUrl: './zone-camera-detail.component.html',
  styleUrls: ['./zone-camera-detail.component.css']
})
export class ZoneCameraDetailComponent implements OnInit {

  camera: any;

  constructor(private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.camera = {
      name: "Camera 1"
    };
  }
}
