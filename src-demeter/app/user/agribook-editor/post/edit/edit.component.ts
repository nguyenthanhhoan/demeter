import { PostService } from '../../../../core/api/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  post: any = {};
  private id: Number;
  constructor(private route: ActivatedRoute,
              private postService: PostService){ }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.postService.getOne(this.id)
    .subscribe((post) => {
      this.post = post;
    });
  }
}
