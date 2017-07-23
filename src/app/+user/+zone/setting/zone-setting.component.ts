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

  public state: any = {
    tabs: {
      activeTab: 0
    }
  };

  constructor(private store: Store<any>) {

  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile(() => {
      return (typeof this.zone.id === 'undefined');
    })
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zone = Object.assign({}, zoneModel.zone);;
      }
    });
  }
}
