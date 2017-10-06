import { ActivatedRoute, Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_core/api/api.service';
import { AuthService } from '../_core/services/auth.service';

@Component({
  template: `<ng-content></ng-content>`,
})
export class AuthComponent implements OnInit {
  constructor(private tokenService: Angular2TokenService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    this.validateToken();
  }

  ngOnInit() {

  }
  validateToken() {
    const uid = this.route.snapshot.params['uid'];
    const client = this.route.snapshot.params['client'];
    const accessToken = this.route.snapshot.params['accessToken'];
    this.authService.init();
    this.router.navigate([`/`]);
  }
}
