import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToggleNotificationAction, ToggleSettingAction } from '../../../core/actions/actions';

@Component({
  selector: 'dmt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  user = {};
  notifications = [];
  numOfUnreadNotis: number = 0;
  private storeSubscription: ISubscription;
  private appStateSubscription: ISubscription;
  private isShowSetting: boolean = false;
  private isShowNotification: boolean = false;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
      if (app.notifications) {
        this.notifications = app.notifications;
        const unreadNotis = this.notifications.filter(notification => {
          return !notification.is_read;
        });
        this.numOfUnreadNotis = unreadNotis.length;
      }
    });
    this.appStateSubscription = this.store.select('appState')
    .subscribe((app: any) => {
      this.isShowSetting = app.isShowSetting;
      this.isShowNotification = app.isShowNotification;
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  toggleSetting() {
    this.store.dispatch(new ToggleSettingAction(true));
  }

  toggleNotification() {
    this.store.dispatch(new ToggleNotificationAction(true));
  }
}
