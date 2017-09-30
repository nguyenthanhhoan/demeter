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

    if (this.live) {
      this.playLive();
    }
  }

  initPlayer(src, autoplay) {
    this.autoplay = autoplay;
    this.src = src;
    let videoEle = $(this.el.nativeElement).find('.camera-pic-holder').find('video');
    setTimeout(() => {
      $(videoEle).mediaelementplayer({
        stretching: 'responsive',
        success: (media) => {
          this.player = media;
        }
      })[0];
    }, 1000);
  }

  playLive() {
    const { hash_id, rtsp_url, rtmp_url } = this.camera;
    if (rtmp_url && rtmp_url.length > 0) {
      this.initPlayer(rtmp_url, true);
    } else {
      const url = `http://camera.demeter.vn/api/playback?action=live&id=${hash_id}&url=${rtsp_url}`;
      this.apiService.fetchExternal(url)
      .subscribe((data: any) => {
        this.initPlayer(data.src, true);
      });
    }
  }
}
