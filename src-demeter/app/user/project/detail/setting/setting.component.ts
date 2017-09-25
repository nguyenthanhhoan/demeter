import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  project: any = {};
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = Object.assign({}, app.project);
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
