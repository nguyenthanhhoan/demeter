import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'finance-table',
  templateUrl: './finance-table.component.html',
  styleUrls: ['./finance-table.component.scss']
})
export class FinanceTableComponent implements OnInit, OnDestroy {
  @Input() tableName: string;

  constructor(private store: Store<any>) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
