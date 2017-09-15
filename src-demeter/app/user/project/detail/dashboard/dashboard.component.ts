import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../../../core/api/api.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  project: any = {};
  camera: any = {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4'
  };
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private apiService: ApiService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.loaded) {
        this.project = app.project;
        console.log('this.project', this.project);
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
