import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Angular2TokenService } from 'angular2-token';

import { LocalStorageService } from '../shared/utils/localstorage.service';
import { NotificationService } from "../shared/utils/notification.service";
import { ApiService } from '../core/api/api.service';
import { User } from './user';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService, 
              private router: Router, 
              private localStorageService: LocalStorageService,
              private tokenService: Angular2TokenService,
              private notificationService: NotificationService) { }

  login(user): void {
    this.tokenService.signIn(user).subscribe(
      res => {
        this.apiService.fetch('current_user')
          .subscribe(res => {
            if (res.has_project) {
              this.router.navigate(['/user/project']);
            } else {
              this.router.navigate(['/user/project/new']);
            }
          }
        );
      },
      error => {
        this.notificationService.bigBox({
          title: error.statusText,
          content: error.json().errors,
          color: "#C46A69",
          icon: "fa fa-warning shake animated",
          number: "1",
          timeout: 5000
        });
      }
    );
  }

  loggedIn(): boolean {
    let user = this.localStorageService.retrieve('user');
    let isLoggedIn = user && user.id;
    return isLoggedIn;
  }

  private deleteCookie(name) {
    this.setCookie(name, "", -1);
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = "") {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }
}
