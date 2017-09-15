import { Component, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../../../../core/api/api.service';

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
              private apiService: ApiService) {
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
    // let url = 'http://demeter.cam9.tv/admin/api/playback/?action=hlsgettoken';
    // let {server} = this.camera;
    // // let {live_hash} = this.camera;
    // let live_hash = 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b2';
    // let {secret_id} = this.camera;
    // let {channel} = this.camera;
    // let live_url =
    //   `${url}&channel=${channel}&server=${server}&secret_id=${secret_id}&hash=${live_hash}`;

    // this.apiService.fetchExternal(live_url)
    //   .subscribe(data => {
    //     this.initPlayer(data.src, true);
    //   });
    this.initPlayer(this.camera.src, true);
  }

  playback(filter, camera) {
    let start = moment(`${filter.date} ${filter.timeFrom}`, 'DD/MM/YYYY HH:mm');
    let end = moment(`${filter.date} ${filter.timeTo}`, 'DD/MM/YYYY HH:mm');
    let duration = end.diff(start, 'seconds');
    let starttime = start.format('YYYY-MM-DD HH:mm:ss');

    let {channel} = camera;
    let hash = camera.playback_hash;

    let url = 'http://demeter.cam9.tv/admin/api/playback/?action=playback';
    let playbackUrl =
      `${url}&channel=${channel}
      &starttime=${starttime}&duration=${duration}&hash=${hash}&secret_id=1`;
    this.apiService.fetchExternal(playbackUrl)
      .subscribe(data => {

        if (typeof this.player === 'undefined') {
          this.initPlayer(data, true);
        } else {
          this.player.pause();
          this.player.setSrc(data);
          this.player.load();
        }
      });
  }
}
