import { Location } from '@angular/common';
import { PostService } from '../../../core/api/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: any = {
    likes: []
  };
  user: any = {};
  private appStoreSubscription: ISubscription;
  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private postService: PostService){ }

  ngOnInit() {
    // postService
    const id = +this.route.snapshot.params['id'];
    this.postService.getOne(id)
    .subscribe((post) => {
      this.post = post;
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

  back() {
    this.location.back();
  }

  like() {
    this.postService.like_action(this.post.id)
    .subscribe((post) => {
      this.post = post;
    });
  }
}
