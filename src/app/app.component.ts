import { ISubscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppSettings } from './app.settings';
import { IdPopulatedAction as ZoneIdAction } from './core/actions/zone-action';
import { IdPopulatedAction as ProjectIdAction } from './core/actions/project-action';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'app works!';
  private routerSubscription: ISubscription;

  constructor(private viewContainerRef: ViewContainerRef,
              private translate: TranslateService,
              private _tokenService: Angular2TokenService,
              private router: Router,
              private store: Store<any>) {
    this._tokenService.init({
      apiBase:                    AppSettings.api,
      apiPath:                    null,

      signInPath:                 'auth/sign_in',
      signInRedirect:             null,
      signInStoredUrlStorageKey:  null,

      signOutPath:                'auth/sign_out',
      validateTokenPath:          'auth/validate_token',
      signOutFailedValidate:      false,

      registerAccountPath:        'auth',
      deleteAccountPath:          'auth',
      registerAccountCallback:    window.location.href,

      updatePasswordPath:         'auth',
      resetPasswordPath:          'auth/password',
      resetPasswordCallback:      window.location.href,

      oAuthBase:                  window.location.origin,
      oAuthPaths: {
          github:                 'auth/github'
      },
      oAuthCallbackPath:          'oauth_callback',
      oAuthWindowType:            'newWindow',
      oAuthWindowOptions:         null,

      userTypes:                  null,

      globalOptions: {
          headers: {
              'Content-Type':     'application/json',
              'Accept':           'application/json'
          }
      }
    });

    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
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
      let segments = this.router.routerState.snapshot.url.split('/');
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
