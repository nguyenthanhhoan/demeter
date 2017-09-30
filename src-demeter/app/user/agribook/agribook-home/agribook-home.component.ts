import { ActivatedRoute, Router } from '@angular/router';
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
  favoritePosts: any[];
  trendingPosts: any[];
  private storeSubscription: ISubscription;
  private appStoreSubscription: ISubscription;

  constructor(private store: Store<any>,
              private route: ActivatedRoute,
              private router: Router){ }

  ngOnInit() {
    this.storeSubscription = this.store.select('agriBookState')
    .subscribe((state: any) => {
      if (state.posts && state.postsLoaded) {
        this.isLoading = false;
        this.posts = state.posts;
      }
      if (state.trendingPosts && state.postsLoaded) {
        this.isLoading = false;
        this.trendingPosts = state.trendingPosts;
      }
      if (state.favoritePosts && state.favoritePostsLoaded) {
        this.isLoading = false;
        this.favoritePosts = state.favoritePosts;
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
    this.appStoreSubscription.unsubscribe();
  }

  private goTo(menu) {
    this.activeMenu = menu.id;
  }

  private goToSearch() {
    this.router.navigate([`${this.user.username}/agribook/search`]);
  }
}
