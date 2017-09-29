import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../../core/api/services/topic.service';

@Component({
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  topic: any = {};
  private id: Number;
  constructor(private route: ActivatedRoute,
              private topicService: TopicService){ }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.topicService.getOne(this.id)
    .subscribe((topic) => {
      this.topic = topic;
    });
  }
}
