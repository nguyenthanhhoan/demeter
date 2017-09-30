import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'agribook-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit, OnDestroy {
  @Input()
  posts: any[] = [];
  private appStoreSubscription: ISubscription;
  private user: any = {};

  constructor(private store: Store<any>,
              private router: Router){ }

  ngOnInit() {
    this.appStoreSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
  }

  ngOnDestroy() {
    this.appStoreSubscription.unsubscribe();
  }

  private goToPost(post) {
    this.router.navigate([`/${this.user.username}/agribook/${post.id}`]);
  }
}
