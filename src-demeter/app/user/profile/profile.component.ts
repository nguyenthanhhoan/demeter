import { Component, Input } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../core/api/services/profile.service';
import { LoadedAction } from '../../core/actions/actions';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input()
  user: any = { };
  @Input()
  password: any = {
    current_password: "",
    password: "",
    password_confirmation: ""
  }
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private profileService: ProfileService,
              private notificationService: NotificationService) {}
  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
  update() {
    this.profileService.put(this.user)
    .subscribe((user) => {
      this.notificationService.showMessage('Profile updated successfully!');
      this.store.dispatch(new LoadedAction(user));
    });
  }
  changePassword() {
    this.profileService.updatePassword(this.password)
    .subscribe((user) => {
      this.notificationService.showMessage('Password updated successfully!');
    });
  }
}
