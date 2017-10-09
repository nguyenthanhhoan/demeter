import { Angular2TokenService } from 'angular2-token';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';

@Injectable()
export class AuthService {
  private _initialized: boolean = false;
  constructor(private tokenService: Angular2TokenService) {
  }

  get initialized(): boolean {
    return this._initialized;
  }

  init() {
    if (this._initialized) {
      // Only init once
      return;
    }
    this._initialized = true;
    this.tokenService.init({
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
          github:                 'auth/github',
      },
      oAuthCallbackPath:          'oauth_callback',
      oAuthWindowType:            'newWindow',
      oAuthWindowOptions:         null,

      userTypes:                  null,

      globalOptions: {
          headers: {
              'Content-Type':     'application/json',
              'Accept':           'application/json',
          },
      },
    });
  }

}
