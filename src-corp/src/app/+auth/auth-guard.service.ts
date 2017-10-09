import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { AppSettings } from '../app.settings';

declare var window: any;
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    // If user is not logged in we'll send them to the login page
    if (!this.auth.loggedIn()) {
      window.location = AppSettings.home_url;
      return false;
    }
    return true;
  }
}
