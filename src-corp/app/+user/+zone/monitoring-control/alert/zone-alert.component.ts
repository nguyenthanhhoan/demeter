import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'zone-alert',
  templateUrl: './zone-alert.component.html',
  styleUrls: ['./zone-alert.component.scss']
})
export class ZoneAlertComponent implements OnInit {
  projectId: number;
  zoneId: number;
  activeTab: number = -1;

  private routerSubscription: ISubscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.subscribeRouterEvent();
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zoneId);
    })
    .subscribe((zoneModel: any) => {
      if (zoneModel.zone && zoneModel.zone.id) {
        this.zoneId = zoneModel.zone.id;
        this.projectId = zoneModel.zone.project.id;
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.route.snapshot.routeConfig.path === 'alert-rule') {
          this.activeTab = 1;
        } else {
          this.activeTab = 0;
        }
      }
    });
  }

  goToAlert() {
    if (this.activeTab !== 0) {
      this.router
      .navigate([
        `/user/project/${this.projectId}/zone/${this.zoneId}`
        + `/monitoring-control/alert`
      ]);
    }
  }

  goToSettings() {
    if (this.activeTab !== 1) {
      this.router
      .navigate([
        `/user/project/${this.projectId}/zone/${this.zoneId}`
        + `/monitoring-control/alert/alert-rule`
      ]);
    }
  }
}
