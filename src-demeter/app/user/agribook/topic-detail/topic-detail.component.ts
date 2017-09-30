import { ISubscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { TopicService } from '../../../core/api/services/topic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {

  topic: any = {};
  user: any = {};
  posts: any[] = [];
  private appStoreSubscription: ISubscription;
  constructor(private store: Store<any>,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private topicService: TopicService){ }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.topicService.getOne(id)
    .subscribe((topic: any) => {
      this.topic = topic;
      this.posts = topic.posts;
    });
    this.appStoreSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
  }

  back() {
    this.location.back();
  }
}
