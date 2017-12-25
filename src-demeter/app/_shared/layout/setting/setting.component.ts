import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { ToggleSettingAction } from '../../../core/actions/actions';

@Component({
  selector: 'dmt-setting-menu',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  user: any = {};
  isShowSetting: boolean = false;
  private storeSubscription: ISubscription;
  private appStateSubscription: ISubscription;

  constructor(private router: Router,
              private store: Store<any>,
              private tokenService: Angular2TokenService) { }

  ngOnInit() {
    this.appStateSubscription = this.store.select('appState')
    .subscribe((app: any) => {
      this.isShowSetting = app.isShowSetting;
    });
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.appStateSubscription.unsubscribe();
  }

  signOut() {
    this.tokenService.signOut().subscribe(
      res => {
        this.store.dispatch(new ToggleSettingAction(false));
        this.router.navigate(['/']);
      }
    );
  }

  private onClickedOutside(e) {
    const isSettingBtn = $(e.target).hasClass('setting-btn')
      || $(e.target).parents('.setting-btn').length > 0
    if (!isSettingBtn) {
    if (!$(e.target).parents('.setting-btn').length) {
      this.store.dispatch(new ToggleSettingAction(false));
    }
  }
}
