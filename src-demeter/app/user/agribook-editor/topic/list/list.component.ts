import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../../core/api/services/topic.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  topics: any[] = [];
  constructor(private topicService: TopicService,
              private notificationService: NotificationService){ }

  ngOnInit() {
    this.fetchTopic();
  }

  fetchTopic() {
    this.topicService.getTopics()
    .subscribe((topics) => {
      this.topics = topics;
    });
  }

  remove(topic) {
    this.notificationService.confirm('Do you want to remove this topic?')
    .subscribe(() => {
      this.topicService.delete(topic.id)
      .subscribe(() => {
        this.notificationService.showMessage('Topic removed successfully!');
        this.fetchTopic();
      });
    });
  }
}
