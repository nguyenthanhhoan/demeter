import { ISubscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AuthService } from './_core/services/auth.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: ISubscription;

  constructor(private router: Router,
              private analytics: AnalyticsService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.subscribeRouterEvent();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private subscribeRouterEvent() {
    // Subcribe router event to make sure this code run after AuthComponent.validateToken
    this.routerSubscription = this.router.events.subscribe(this.handleRouteParam.bind(this));
  }

  private handleRouteParam(event) {
    if (event instanceof NavigationEnd) {
      this.authService.init();
    }
  }
}
