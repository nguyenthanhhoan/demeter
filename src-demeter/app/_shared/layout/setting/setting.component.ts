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
export class SettingComponent implements OnInit, OnDestroy{
  isShowSetting: boolean = false;
  private storeSubscription: ISubscription;

  constructor(private router: Router,
              private store: Store<any>,
              private tokenService: Angular2TokenService) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('appState')
    .subscribe((app: any) => {
      this.isShowSetting = app.isShowSetting;
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  signOut() {
    this.tokenService.signOut().subscribe(
      res => {
        this.store.dispatch(new ToggleSettingAction(false));
        this.router.navigate(['/']);
      }
    );
  }
}
