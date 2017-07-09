import { LoadedAction, IdPopulatedAction } from '../../core/actions/zone-action';
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
  private projectId: number;
  private zoneId: number;
  private lastZoneId: number;
  private zone: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private zoneService: ZoneService,
              private store: Store<any>) { }

  ngOnInit() {
    this.subscribeRouterEvent();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(this.handleRouteParam.bind(this));
  }

  handleRouteParam(event) {
    if (event instanceof NavigationEnd) {
      this.zoneId = +this.route.snapshot.params['id'];
      this.projectId = +this.route.snapshot.params['project_id'];

      this.store.dispatch(new IdPopulatedAction({
        zoneId: this.zoneId,
        projectId: this.projectId
      }));
      if (this.zoneId && this.projectId &&
        (typeof this.lastZoneId === 'undefined' || this.lastZoneId !== this.zoneId)) {
        this.lastZoneId = this.zoneId;
        this.loadZoneDetail();
      }
    }
  }

  loadZoneDetail() {
    this.zoneService.getOne(this.projectId, this.zoneId).subscribe(data => {
      this.zone = data;
      this.store.dispatch(new LoadedAction(data));
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
