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
              private notificationService: NotificationService){ }

  ngOnInit() {
    this.fetchPost();
  }

  fetchPost() {
    this.postService.getPosts()
    .subscribe((posts) => {
      this.posts = posts;
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
