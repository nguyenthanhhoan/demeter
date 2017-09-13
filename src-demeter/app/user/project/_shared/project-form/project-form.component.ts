import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ProjectService } from '../../../../core/api/services/project.service';
import { NotificationService } from '../../../../core/services/notification.service';

declare var $: any;
@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  project: any = {};
  mode: String = 'new';
  user: any = {};
  private storeSubscription: ISubscription;
  constructor(private router: Router,
              private store: Store<any>,
              private el: ElementRef,
              private projectService: ProjectService,
              private notificationService: NotificationService) {}
  ngOnInit() {
    this.storeSubscription = this.store.select('user')
    .subscribe((user: any) => {
      if (user.loaded) {
        this.user = user.user;
      }
    });
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (this.mode === 'edit') {
      // TODO: Update image
    } else {
      if (fileList.length > 0) {
        this.project.image = fileList[0];
      }
      this.readURL(event.target);
    }
  }
  readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $('.upload-preview').css('background-image', 'url(' + e.target['result'] + ')');
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  create() {
    this.projectService.post(this.project)
    .subscribe(() => {
      this.notificationService.showMessage('Project created successfully!');
      this.router.navigate([`/${this.user.username}`]);
    });
  }
}
