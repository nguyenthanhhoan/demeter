import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { LocalStorageService } from '../shared/utils/localstorage.service';
import { ApiService } from '../core/api/api.service';
import { User } from './user';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService, 
              private router: Router, 
              private localStorageService: LocalStorageService) { }

  login(user): void {
    this.apiService.post('login', {user: user}).subscribe(data => {
      this.localStorageService.store('user', data.user);
      // this.setCookie('XSRF-TOKEN', data.csrfToken, 2);
      if (data.user.has_project) {
        this.router.navigate(['/user/project']);
      } else {
        this.router.navigate(['/user/project/new']);
      }
    });
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
