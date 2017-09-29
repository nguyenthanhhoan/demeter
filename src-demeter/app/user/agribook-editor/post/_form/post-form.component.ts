import { setTimeout } from 'timers';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../../core/api/services/post.service';
import { NotificationService } from '../../../../core/services/notification.service';

declare var $: any;
@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  mode: String;
  @Input()
  post: any = {};
  user: any = {};
  private isInitNote: boolean = false;
  private storeSubscription: ISubscription;
  constructor(private postService: PostService,
              private router: Router,
              private store: Store<any>,
              private notificationService: NotificationService){ }

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

  ngOnChanges() {
    if (this.mode !== 'add' && this.post.id) {
      this.initSummerNote();
    } else {
      this.initSummerNote();
    }
  }

  initSummerNote() {
    if (this.isInitNote) return;
    this.isInitNote = true;

    setTimeout(() => {
      $('#summernote').summernote({
        toolbar: [
          // [groupName, [list of button]]
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']]
        ]
      });
    }, 2000);
  }

  saveOrUpdate() {
    this.post.content = $('#summernote').summernote('code');
    if (this.mode === 'add') {
      this.postService.post(this.post)
      .subscribe(() => {
        this.router.navigate([`/${this.user.username}/agribook-editor/post`]);
        this.notificationService.showMessage('Post added succesfully!');
      });
    } else {
      this.postService.put(this.post)
      .subscribe(() => {
        this.router.navigate([`/${this.user.username}/agribook-editor/post`]);
        this.notificationService.showMessage('Post updated succesfully!');
      });
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.post.picture = fileList[0];
    }
  }
}
