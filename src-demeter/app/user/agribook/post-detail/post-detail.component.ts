import { Location } from '@angular/common';
import { PostService } from '../../../core/api/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: any = {};
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
  }

  back() {
    this.location.back();
  }
}
