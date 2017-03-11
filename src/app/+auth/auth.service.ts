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
  constructor(private apiService: ApiService, private router: Router, private localStorageService: LocalStorageService) { }

  login(user): void {
    this.apiService.post('login', {user: user}).subscribe(data => {
      this.localStorageService.store('user', data.user);
      this.router.navigate(['/home']);
    });
  }

  loggedIn(): boolean {
    let user = this.localStorageService.retrieve('user');
    let isLoggedIn = user && user.id;
    return isLoggedIn;
  }
}
