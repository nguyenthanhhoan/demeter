import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CoreService } from '../../core/api/services/core.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'mobile-register',
  templateUrl: './mobile-register.component.html',
  styleUrls: ['./mobile-register.component.scss']
})
export class MobileRegisterComponent implements OnInit {
  signUpAccount: any = {};
  fetching: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private coreService: CoreService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.fetching = false;
  }

  signUp($event) {
    $event.preventDefault();
    // TODO: Got. Need to investigate more
    // `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed
    // after it was checked. Previous value: 'true'. Current value: 'false'.`
    this.fetching = true;
    this.coreService.signUp(this.signUpAccount)
    .subscribe(res => {
      this.fetching = false;
      this.notificationService.showMessage('User sign up successfully!');
      this.signUpAccount = {};
      this.router.navigate(['/']);
    }, error => {
      this.fetching = false;
    });
  }
}
