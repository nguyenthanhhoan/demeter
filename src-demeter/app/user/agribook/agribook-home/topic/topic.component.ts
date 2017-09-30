import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'agribook-home-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy {
  user: any = {};
  isLoading: boolean = true;
  topics: any[];
  private storeSubscription: ISubscription;

  constructor(private store: Store<any>,
              private router: Router){ }

  ngOnInit() {
    this.storeSubscription = this.store.select('agriBookState')
    .subscribe((state: any) => {
      console.log('topics state', state);
      if (state.topics && state.topicsLoaded) {
        this.isLoading = false;
        this.topics = state.topics;
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
