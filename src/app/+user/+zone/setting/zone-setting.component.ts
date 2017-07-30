import { ISubscription } from 'rxjs/Subscription';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ZoneService } from '../../../core/services/zone.service';
import { LoadedAction } from '../../../core/actions/zone-action';

@Component({
  templateUrl: './zone-setting.component.html',
  styleUrls: ['./zone-setting.component.css']
})
export class ZoneSettingComponent implements OnInit, OnDestroy {

  zone: any = {};

  public state: any = {
    tabs: {
      activeTab: 0
    }
  };

  subscription: ISubscription;

  constructor(private store: Store<any>,
              private zoneService: ZoneService) {
  }

  ngOnInit() {
    this.subscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zone = Object.assign({}, zoneModel.zone);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadZone() {
    let zoneId = this.zone.id;
    this.zoneService.getOne(zoneId).subscribe(data => {
      this.zone = data;
      this.store.dispatch(new LoadedAction(data));
    });
  }
}
