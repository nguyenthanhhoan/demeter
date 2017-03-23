import { Component, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../core/api/api.service';

declare var flowplayer: any;
declare var moment: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {

  @Input() camera: any;
  @Input() live: boolean = true;
  player: any;

  constructor(private el:ElementRef,
              private apiService: ApiService) {
  }

  ngOnInit() {

    if (this.live) {
      this.playLive();
    } else {
      this.initPlayer('');
    }
  }

  initPlayer(src) {
    var cameraHolder = $(this.el.nativeElement).find('.camera-pic-holder');
    this.player = flowplayer(cameraHolder[0], {
      splash: true,
      ratio: 9/16,
      clip: {
        live: true,
        sources: [{
          type: "application/x-mpegurl",
          src: src
          //Demo src: //nasatv-lh.akamaihd.net/i/NASA_101@319270/master.m3u8
        }]
      }
    });
  }

  playLive() {
    let url = "http://demeter.cam9.tv/admin/api/playback/?action=hlsgettoken";
    let {server} = this.camera;
    // let {live_hash} = this.camera;
    let live_hash = "b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b2";
    let {secret_id} = this.camera;
    let {channel} = this.camera;
    let live_url = `${url}&channel=${channel}&server=${server}&secret_id=${secret_id}&hash=${live_hash}`;
    this.apiService.fetchExternal(live_url)
      .subscribe(data => {
        this.initPlayer(data.src);
      });
  }

  playback(filter, camera) {
    let start = moment(`${filter.date} ${filter.timeFrom}`, "DD/MM/YYYY HH:mm");
    let end = moment(`${filter.date} ${filter.timeTo}`, "DD/MM/YYYY HH:mm");
    let duration = start.diff(end, 'seconds');
    let starttime = start.format("YYYY-MM-DD HH:mm:ss");

    
    let {channel} = camera;
    let hash = camera.playback_hash;

    let url = "http://demeter.cam9.tv/admin/api/playback/?action=playback";
    let playbackUrl = `${url}&channel=${channel}&starttime=${starttime}&duration=${duration}&hash=${hash}&secret_id=1`;
    this.apiService.fetchExternal(playbackUrl)
      .subscribe(data => {
        this.player.unload();
        this.player.load({
          sources: [{ 
            type: "application/x-mpegurl",
            src: data
          }]
        });
      });
  }
}
