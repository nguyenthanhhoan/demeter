import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/api/services/post.service';
import { LoadedPostAction } from '../../core/actions/actions';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class AgribookComponent implements OnInit {
  user: any = {};
  posts: any[] = [];
  constructor(private postService: PostService,
              private store: Store<any>) {}

  ngOnInit() {
    this.postService.getPosts()
    .subscribe((posts) => {
      this.posts = posts;
      this.store.dispatch(new LoadedPostAction(posts));
    });
  }
}
