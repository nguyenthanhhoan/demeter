import { Observable, Subject } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadedAction } from '../actions/actions';
import { Angular2TokenService } from 'angular2-token';
import { AppSettings } from '../../app.settings';
import { NotificationService } from '../../core/services/notification.service';
import { ApiService } from '../api/api.service';
declare var Noty: any;
declare var window: any;
@Injectable()
export class AuthService {
  constructor(private apiService: ApiService,
              private router: Router,
              private tokenService: Angular2TokenService,
              private store: Store<any>,
              private notificationService: NotificationService) { }

  login(user): Subject<any> {
    const broadcast = new Subject();
    this.tokenService.signIn(user)
    .subscribe(
      res => {
        this.apiService.fetch('current_user')
          .subscribe(userRes => {
            if (userRes.role === AppSettings.role.admin.name) {
              this.redirectTo(AppSettings.admin_url);
            } else if (userRes.role === AppSettings.role.corp_user.name) {
              this.redirectTo(AppSettings.corp_url);
            } else if (userRes.role === AppSettings.role.family_user.name) {
              // TODO
              this.router.navigate([`/${userRes.username}`]);
            } else {
              alert('Corporate page is implementing!');
              // if (userRes.has_project) {
              //   this.router.navigate(['/user/project']);
              // } else if (userRes.assigned_zone) {
              //   let {assigned_zone} = userRes;
              //   this.router.navigate([`/user/project/${assigned_zone.project_id}/zone/${assigned_zone.zone_id}`]);
              // } else {
              //   this.router.navigate(['/user/project/new']);
              // }
            }
            this.store.dispatch(new LoadedAction(userRes));
          }
        );
      },
      error => {
        // TODO: Handle globally
        const message = error.json().errors || 'Service is temporarily unavailable';
        new Noty({
          text: message,
          type: 'error',
          timeout: 2000
        }).show();
        broadcast.error(null);
      }
    );
    return broadcast;
  }

  loggedIn(): boolean {
    let isLoggedIn = this.tokenService.userSignedIn();
    return isLoggedIn;
  }

  redirectTo(serverUrl) {
    const { currentAuthData } = this.tokenService;
    const { accessToken, client, uid, expiry } = currentAuthData;
    window.location = `${serverUrl}#/?uid=${uid}&client_id=${client}&token=${accessToken}&expiry=${expiry}`;
  }
}
