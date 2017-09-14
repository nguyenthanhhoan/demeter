import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../../../core/api/api.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private store: Store<any>,
              private apiService: ApiService) {}

  ngOnInit() {
    
  }

  ngOnDestroy() {

  }

}
