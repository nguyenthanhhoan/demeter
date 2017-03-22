import { Component, Input, ElementRef } from '@angular/core';

declare var flowplayer: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {

  @Input()
  src: any;

  constructor(private el:ElementRef) {
  }

  ngOnInit() {

    var cameraHolder = $(this.el.nativeElement).find('.camera-pic-holder');
    flowplayer(cameraHolder[0], {
      splash: true,
      ratio: 9/16,
      clip: {
        live: true,
        sources: [{ 
          type: "application/x-mpegurl",

          // Source internet
          // src: "//nasatv-lh.akamaihd.net/i/NASA_101@319270/master.m3u8" 

          //Source caudat
          // "http://04c2.vp9.tv:2229/chn/DMT11/v.m3u8"
          src: this.src
          
        }]
      }
    });
  }
}
