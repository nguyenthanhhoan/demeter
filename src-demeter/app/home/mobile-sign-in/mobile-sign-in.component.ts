import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CoreService } from '../../core/api/services/core.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'mobile-sign-in',
  templateUrl: './mobile-sign-in.component.html',
  styleUrls: ['./mobile-sign-in.component.scss']
})
export class MobileSignInComponent implements OnInit {
  loginAccount: any = {};
  fetching: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private coreService: CoreService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  login() {
    this.fetching = true;

    Observable.timer(500)
    .switchMapTo(this.authService.login(this.loginAccount))
    .subscribe(() => {
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }
}
