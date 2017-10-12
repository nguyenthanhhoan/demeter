import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  activeTab: string;
  projectId: number;
  zoneId: number;
  private subscription: ISubscription;
  private routerSubscription: ISubscription;

  constructor(private store: Store<any>,
              private zoneService: ZoneService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscribeRouterEvent();
  }

  ngOnInit() {
    this.subscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zone = Object.assign({}, zoneModel.zone);
        this.zoneId = zoneModel.zoneId;
        this.projectId = zoneModel.projectId;
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

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeTab = this.route.snapshot.routeConfig.path;
      }
    });
  }

  goToTab(tab) {
    let settingPath = `/user/project/${this.projectId}/zone/${this.zoneId}/setting`;
    if (tab && tab.length > 0) {
      this.router.navigate([`${settingPath}/${tab}`]);
    } else {
      this.router.navigate([`${settingPath}`]);
    }
  }
}
