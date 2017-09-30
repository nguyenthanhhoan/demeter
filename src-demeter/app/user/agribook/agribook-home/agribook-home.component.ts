import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './agribook-home.component.html',
  styleUrls: ['./agribook-home.component.scss']
})
export class AgribookHomeComponent implements OnInit {
  search: String;
  user: any = {};

  menus: any[] = [{
    id: 'all',
    text: 'All',
    link: ''
  }, {
    id: 'topic',
    text: 'Topic',
    link: ''
  }, {
    id: 'favorite',
    text: 'Favorite',
    link: ''
  }, {
    id: 'trend',
    text: 'Trend',
    link: ''
  }];
  activeMenu: String = 'all';
  isLoading: boolean = true;
  posts: any[];
  private storeSubscription: ISubscription;

  constructor(private store: Store<any>,
              private router: Router){ }

  ngOnInit() {
    this.storeSubscription = this.store.select('agriBookState')
    .subscribe((state: any) => {
      if (state.posts && state.postsLoaded) {
        this.isLoading = false;
        this.posts = state.posts;
      }
    });
  }

  private goTo(menu) {
    this.activeMenu = menu.id;
  }
}
