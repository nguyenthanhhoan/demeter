import {Component, ViewContainerRef} from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public title = 'app works!';

  public constructor(private viewContainerRef: ViewContainerRef,
                    private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase:                    location.protocol + '//' + location.hostname,
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
  }
}
