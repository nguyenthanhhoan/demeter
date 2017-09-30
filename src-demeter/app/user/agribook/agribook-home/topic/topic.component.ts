import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'agribook-home-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy {
  user: any = {};
  isLoading: boolean = true;
  topics: any[];

  // Do not show content after calculate height
  isContentShown: boolean = false;
  private storeSubscription: ISubscription;
  private appStoreSubscription: ISubscription;

  constructor(private el: ElementRef,
              private store: Store<any>,
              private router: Router){ }

  ngOnInit() {
    this.storeSubscription = this.store.select('agriBookState')
    .subscribe((state: any) => {
      if (state.topics && state.topicsLoaded) {
        this.isLoading = false;
        this.topics = state.topics;
        // Waiting for projects rendered
        setTimeout(() => {
          this.caculateHeightProjectItem();
        }, 100);
      }
    });
    this.appStoreSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.appStoreSubscription.unsubscribe();
  }

  // Make height equals to width
  caculateHeightProjectItem() {
    const topicEl = $(this.el.nativeElement).find('.single-topic');
    const width = topicEl.width();
    topicEl.height(width);
    this.isContentShown = true;
  }

  goToTopic(topic) {
    this.router.navigate([`/${this.user.username}/agribook/topic/${topic.id}`]);
  }
}
