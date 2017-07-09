import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppSettings } from '../../../../app.settings';
import { DeviceFieldService } from '../../../../core/services/device-field-service';
import { NotificationService } from '../../../../shared/utils/notification.service';

@Component({
  selector: 'zone-control',
  templateUrl: './zone-control.component.html',
  styleUrls: ['./zone-control.component.scss']
})
export class ZoneControlComponent {
  project_id: number;
  zone_id: number;
  activeTab: number = -1;

  private routerSubscription: ISubscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>,
              private deviceFieldService: DeviceFieldService,
              private ngZone: NgZone,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.subscribeRouterEvent();
    this.store.select('zone')
    .takeWhile(() => {
      return (!this.zone_id);
    })
    .subscribe((zoneModel: any) => {
      this.zone_id = zoneModel.zoneId;
      this.project_id = zoneModel.projectId;
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.route.snapshot.routeConfig.path === 'executions') {
          this.activeTab = 1;
        } else {
          this.activeTab = 0;
        }
      }
    });
  }

  goToExecutions() {
    if (this.activeTab !== 1) {
      this.router
      .navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/control/executions`]);
    }
  }

  goToDevices() {
    if (this.activeTab !== 0) {
      this.router
      .navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/control`]);
    }
  }

}
