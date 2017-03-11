import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    // If user is not logged in we'll send them to the login page 
    if (!this.auth.loggedIn()) {
      console.log('User havenot logged in yet! Go to login page!');
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}