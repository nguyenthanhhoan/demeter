import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AuthService } from './_core/services/auth.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private authService: AuthService) {
    this.authService.init();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
