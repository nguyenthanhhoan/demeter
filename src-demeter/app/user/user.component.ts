import { setTimeout } from 'timers';
import { NavigationEnd, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { ApiService } from '../core/api/api.service';
import { LoadedAction, LoadedNotificationAction } from '../core/actions/actions';
import { AppSettings } from '../app.settings';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class UserComponent implements OnInit, OnDestroy {
  user: any = {};
  private storeSubscription: ISubscription;
  private routerSubscription: ISubscription;
  constructor(private store: Store<any>,
              private router: Router,
              private apiService: ApiService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.loaded) {
        this.user = app.user;
      }
    });
    // this.routerSubscription = this.router.events.subscribe(this.handleRouteParam.bind(this));
    // TODO: Remove timeout technique by subcribing event stream
    // Donot know why subcribing event executed after routing
    setTimeout(() => {
      this.handleRouteParam(null);
    }, 800);
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    // this.routerSubscription.unsubscribe();
  }

  private initFirebase(user) {
    const config = AppSettings.firebase_config;
    firebase.initializeApp(config);

    const database = firebase.database();

    const starCountRef = database.ref(`notifications_${user.uuid}`);
    starCountRef.on('value', (snapshot) => {
      console.log('snapshot', snapshot.val());
      this.store.dispatch(new LoadedNotificationAction(snapshot.val()));
    });
  }

  private handleRouteParam(event) {
    // if (event instanceof NavigationEnd) {
      if (typeof this.user.username === 'undefined') {
        // The current_user haven't been fetched yet, need to perform fetching data
        console.log('Fetching current_user');
        this.apiService.fetch('current_user')
        .subscribe((user) => {
          this.store.dispatch(new LoadedAction(user));
          this.initFirebase(user);
        });
      }
    // }
  }
}
