import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  project: any = {};
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.loaded) {
        this.project = Object.assign({}, app.project);
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
