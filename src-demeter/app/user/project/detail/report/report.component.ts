import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSettings } from '../../../../app.settings';

declare var moment: any;
@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  isRequesting: boolean = false;
  project: any = {};
  reportFilter: any = {
    date: moment().format(AppSettings.date_time_format.date_iso),
    start_time: '00:00',
    end_time: '23:59'
  };
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

  report() {
    console.log('Report Button clicked!');
  }
}
