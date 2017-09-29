import { setTimeout } from 'timers';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../core/api/services/post.service';
import { NotificationService } from '../../../../core/services/notification.service';
 import { TopicService } from '../../../../core/api/services/topic.service';

declare var $: any;
@Component({
  selector: 'topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  @Input()
  mode: String;
  @Input()
  topic: any = {};
  user: any = {};
  private isInitNote: boolean = false;
  private storeSubscription: ISubscription;
  constructor(private postService: PostService,
              private router: Router,
              private store: Store<any>,
              private notificationService: NotificationService,
              private topicService: TopicService){ }

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  saveOrUpdate() {
    if (this.mode === 'add') {
      this.topicService.post(this.topic)
      .subscribe(() => {
        this.router.navigate([`/${this.user.username}/agribook-editor/topic`]);
        this.notificationService.showMessage('Topic added succesfully!');
      });
    } else {
      this.topicService.put(this.topic)
      .subscribe(() => {
        this.router.navigate([`/${this.user.username}/agribook-editor/topic`]);
        this.notificationService.showMessage('Topic updated succesfully!');
      });
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.topic.picture = fileList[0];
    }
  }
}
