import { PartialObserver } from 'rxjs/Observer';
import { ISubscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppSettings } from './app.settings';
import { IdPopulatedAction as ZoneIdAction } from './core/actions/zone-action';
import { IdPopulatedAction as ProjectIdAction } from './core/actions/project-action';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: ISubscription;

  constructor(private viewContainerRef: ViewContainerRef,
              private translate: TranslateService,
              private _tokenService: Angular2TokenService,
              private router: Router,
              private store: Store<any>,
              private authService: AuthService) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
    this.authService.init();
  }

  ngOnInit() {
    this.subscribeRouterEvent();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(this.handleRouteParam.bind(this));
  }

  handleRouteParam(event) {
    if (event instanceof NavigationEnd) {
      const { url } = this.router.routerState.snapshot;
      let segments = url.split('/');
      let projectId, zoneId;
      for (let index = 0; index < segments.length; index++) {
        let segmentPath = segments[index];
        if (segmentPath === 'project') {
          if (segments[index + 1] !== 'new') {
            projectId = segments[index + 1];
          }
        }
        if (segmentPath === 'zone') {
          if (segments[index + 1] !== 'new') {
            zoneId = segments[index + 1];
          }
        }
      }
      if (zoneId) {
        this.store.dispatch(new ZoneIdAction({
          zoneId: zoneId
        }));
      }
      if (projectId) {
        this.store.dispatch(new ProjectIdAction({
          projectId: projectId
        }));
      }
    }
  }
}
