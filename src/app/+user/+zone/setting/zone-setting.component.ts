import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';

@Component({
  templateUrl: './zone-setting.component.html',
  styleUrls: ['./zone-setting.component.css']
})
export class ZoneSettingComponent implements OnInit {

  zone: any = {};
  zone_id: number;

  public state: any = {
    tabs: {
      activeTab: 0
    }
  };

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
    let needToLoad = true;
    this.store.select('zone')
    .takeWhile(() => {
      return (needToLoad);
    })
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zone = zoneModel.zone;
        this.zone_id = zoneModel.zoneId;
        needToLoad = false;
      }
    });
  }

  loadZone() {
    this.zoneService.getOne(this.zone_id)
    .subscribe((zone) => {
      this.zone = zone;
    });
  }
}
