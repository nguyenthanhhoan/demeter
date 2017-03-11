import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { ApiService } from '../core/api/api.service';
import { User } from './user';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService, private router: Router) { }

  isLoggedIn: boolean = false;

  login(user): void {
    this.apiService.post('login', {user: user}).subscribe(data => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    });
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
