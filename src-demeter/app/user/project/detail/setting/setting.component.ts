import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  project: any = {
    setting: {}
  };
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = Object.assign({}, app.project);
        this.initSetting();
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  private initSetting() {
    const { setting } = this.project;
    if (typeof setting.showHistory === 'undefined') {
      setting.showHistory = true;
    }
    if (typeof setting.showCamera === 'undefined') {
      setting.showCamera = true;
    }
    if (typeof setting.showControl === 'undefined') {
      setting.showControl = true;
    }
    if (typeof setting.showFinance === 'undefined') {
      setting.showFinance = true;
    }
    if (typeof setting.showReport === 'undefined') {
      setting.showReport = true;
    }
    if (typeof setting.showAlert === 'undefined') {
      setting.showAlert = true;
    }
  }
}
