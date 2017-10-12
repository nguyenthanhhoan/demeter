import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Angular2TokenService } from 'angular2-token';

import { AppSettings } from '../app.settings';
import { NotificationService } from '../shared/utils/notification.service';
import { ApiService } from '../core/api/api.service';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService,
              private router: Router,
              private tokenService: Angular2TokenService,
              private notificationService: NotificationService) { }

  login(user): void {
    this.tokenService.signIn(user).subscribe(
      res => {
        this.apiService.fetch('current_user')
          .subscribe(userRes => {
            if (userRes.has_project) {
              this.router.navigate(['/user/project']);
            } else if (userRes.assigned_zone) {
              let {assigned_zone} = userRes;
              this.router.navigate([`/user/project/${assigned_zone.project_id}/zone/${assigned_zone.zone_id}`]);
            } else {
              this.router.navigate(['/user/project/new']);
            }
          }
        );
      },
      error => {
        // TODO: Handle globally
        this.notificationService.bigBox({
          title: error.statusText,
          content: error.json().errors,
          color: '#C46A69',
          icon: 'fa fa-warning shake animated',
          number: '1',
          timeout: 5000
        });
      }
    );
  }

  loggedIn(): boolean {
    let isLoggedIn = this.tokenService.userSignedIn();
    return isLoggedIn;
  }
}
