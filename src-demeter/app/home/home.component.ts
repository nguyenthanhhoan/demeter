import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CoreService } from '../core/api/services/core.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginAccount: any = {};
  signUpAccount: any = {};
  fetching: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private coreService: CoreService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  login() {
    this.fetching = true;
    this.authService.login(this.loginAccount)
    .subscribe(() => {
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }

  signUp() {
    this.fetching = true;
    alert('Temporary disabled!');
    // this.coreService.signUp(this.signUpAccount)
    // .subscribe(res => {
    //   this.fetching = false;
    //   this.notificationService.showMessage('User sign up successfully!');
    //   this.signUpAccount = {};
    // }, error => {
    //   this.fetching = false;
    // });
  }
}
