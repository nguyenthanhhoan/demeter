import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

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
  activeTab: number = 0;

  private routerSubscription: ISubscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deviceFieldService: DeviceFieldService,
              private ngZone: NgZone,
              private notificationService: NotificationService) {
    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscribeRouterEvent();
  }

  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.route.snapshot.routeConfig.path === 'executions') {
          this.activeTab = 1;
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
