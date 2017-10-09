import { LoadedAction, IdPopulatedAction, ResetAction } from '../../core/actions/zone-action';
import { LoadedAction as ProjectLoadedAction } from '../../core/actions/project-action';
import { ZoneService } from '../../core/services/zone.service';

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'zone-component',
  template: '<router-outlet></router-outlet>',
})
export class ZoneComponent implements OnInit, OnDestroy {

  private routerSubscription: ISubscription;
  private zoneId: number;
  private lastZoneId: number;
  private zone: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private zoneService: ZoneService,
              private store: Store<any>) {

    this.store.dispatch(new ResetAction());
    this.subscribeRouterEvent();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(this.handleRouteParam.bind(this));
  }

  handleRouteParam(event) {
    if (event instanceof NavigationEnd) {
      this.zoneId = this.route.snapshot.params['id'];

      this.store.dispatch(new IdPopulatedAction({
        zoneId: this.zoneId
      }));
      if (this.zoneId &&
        (typeof this.lastZoneId === 'undefined' || this.lastZoneId !== this.zoneId)) {

          this.lastZoneId = this.zoneId;
          this.loadZoneDetail();
      }
    }
  }

  loadZoneDetail() {
    this.zoneService.getOne(this.zoneId).subscribe(data => {
      this.zone = data;
      this.store.dispatch(new LoadedAction(data));
      this.store.dispatch(new ProjectLoadedAction(data.project));
    });
  }

}
