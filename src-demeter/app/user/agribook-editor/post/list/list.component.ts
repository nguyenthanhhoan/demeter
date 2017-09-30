import { TopicService } from '../../../../core/api/services/topic.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../core/api/services/post.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  posts: any[] = [];
  constructor(private postService: PostService,
              private topicService: TopicService,
              private notificationService: NotificationService){ }

  ngOnInit() {
    this.fetchPost();
  }

  fetchPost() {
    this.postService.getPosts()
    .subscribe((posts) => {
      this.posts = posts;
      this.fetchTopic();
    });
  }

  fetchTopic() {
    this.topicService.getTopics()
    .subscribe((topics) => {
      this.posts.forEach((post) => {
        if (post.family_topic_id) {
          post.topic = topics.find((topic) => {
            return topic.id === post.family_topic_id;
          });
        }
      });
    });
  }

  remove(post) {
    this.notificationService.confirm('Do you want to remove this post?')
    .subscribe(() => {
      this.postService.delete(post.id)
      .subscribe(() => {
        this.notificationService.showMessage('Post removed successfully!');
        this.fetchPost();
      });
    });
  }
}
