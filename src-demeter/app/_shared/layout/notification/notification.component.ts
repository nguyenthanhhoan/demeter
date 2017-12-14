import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../../../core/api/services/core.service';
import { NotificationService } from '../../../core/services/notification.service';

declare var $: any;
declare var moment: any;
@Component({
  selector: 'dmt-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  user: any = {};
  isShowNotification: boolean = false;
  notifications: any[] = [];
  position: any = {};
  private storeSubscription: ISubscription;

  constructor(private router: Router,
              private store: Store<any>,
              private coreService: CoreService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
      if (app.notifications) {
        this.notifications = this.transformNotification(app.notifications);
      }
      this.positionNotification();
    });
    this.storeSubscription = this.store.select('appState')
    .subscribe((app: any) => {
      this.isShowNotification = app.isShowNotification;
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  markReadNotifications() {
    this.coreService.markNotification()
    .subscribe(() => {

    }, () => {
      this.notificationService.showErrorMessage('Cannot mark notification as read!');
    });
  }

  private transformNotification(notifications) {
    return notifications.map((notification) => {
      return {
        created_at_to_now: moment(notification.created_at).toNow(),
        ...notification
      };
    });
  }

  private positionNotification() {
    const notificationBtn = $('.notification-btn');
    if (notificationBtn && notificationBtn.length > 0) {
      const offset = notificationBtn.offset();
      const width = $(window).width() > 786 ? '300px' : '100%';
      const left = $(window).width() > 786 ? `${offset.left - 300 + notificationBtn.outerWidth()}px` : '0';
      this.position = {
        top: `${notificationBtn.outerHeight()}px`,
        left: left,
        width: width
      };
    }
  }
}
