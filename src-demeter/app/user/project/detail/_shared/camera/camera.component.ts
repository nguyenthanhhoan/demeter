import { Component, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../../../../core/api/api.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var moment: any;
declare var $: any;
declare var MediaElement: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {

  @Input() camera: any;
  @Input() live: boolean = true;
  player: any;
  src: any;
  autoplay: boolean;

  constructor(private el: ElementRef,
              private apiService: ApiService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const { m3u8_url } = this.camera;
    this.initPlayer(m3u8_url, this.live);
  }

  initPlayer(src, autoplay) {
    this.src = src;
    let videoEle = $(this.el.nativeElement).find('.camera-pic-holder').find('video');
    setTimeout(() => {
      $(videoEle).mediaelementplayer({
        stretching: 'responsive',
        success: (media) => {
          this.player = media;
          if (autoplay) {
            this.player.play();
          }
        }
      })[0];
    }, 1000);
  }
}
