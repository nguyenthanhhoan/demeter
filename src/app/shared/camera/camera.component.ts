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

  @Input() src: any;
  @Input() live: boolean = true;
  player: any;

  constructor(private el:ElementRef,
              private apiService: ApiService) {
  }

  ngOnInit() {
    var cameraHolder = $(this.el.nativeElement).find('.camera-pic-holder');
    this.player = flowplayer(cameraHolder[0], {
      splash: true,
      ratio: 9/16,
      clip: {
        live: this.live,
        sources: [{
          type: "application/x-mpegurl",
          src: this.src
        }]
      }
    });
  }

  playback(filter) {
    console.log('filter', filter);
    let start = moment(`${filter.date} ${filter.timeFrom}`, "DD/MM/YYYY HH:mm");
    let end = moment(`${filter.date} ${filter.timeTo}`, "DD/MM/YYYY HH:mm");
    let duration = start.diff(end, 'seconds');

    let starttime = start.format("YYYY-MM-DD HH:mm:ss");
    let url = "http://demeter.cam9.tv/admin/api/playback/?action=playback&channel=DMT11";
    let hash = "c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc";
    let playbackUrl = `${url}&starttime=${starttime}&duration=${duration}&hash=${hash}&secret_id=1`;
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
