import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToggleSettingAction } from '../../../core/actions/actions';

@Component({
  selector: 'dmt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  user = {};
  private storeSubscription: ISubscription;
  private appStateSubscription: ISubscription;
  private isShowSetting: boolean = false;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.loaded) {
        this.user = app.user;
      }
    });
    this.appStateSubscription = this.store.select('appState')
    .subscribe((app: any) => {
      this.isShowSetting = app.isShowSetting;
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  toggleSetting() {
    this.isShowSetting = !this.isShowSetting;
    this.store.dispatch(new ToggleSettingAction(this.isShowSetting));
  }
}
