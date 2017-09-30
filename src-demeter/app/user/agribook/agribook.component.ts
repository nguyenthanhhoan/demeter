import { TopicService } from '../../core/api/services/topic.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/api/services/post.service';
import { LoadedPostAction, LoadedTopicAction } from '../../core/actions/actions';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class AgribookComponent implements OnInit {
  user: any = {};
  constructor(private postService: PostService,
              private topicService: TopicService,
              private store: Store<any>) {}

  ngOnInit() {
    this.postService.getPosts()
    .subscribe((posts) => {
      this.store.dispatch(new LoadedPostAction(posts));
    });
    this.topicService.getTopics()
    .subscribe((topics) => {
      this.store.dispatch(new LoadedTopicAction(topics));
    });
  }
}
