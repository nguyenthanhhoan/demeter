import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../../../core/api/services/project.service';
import { NotificationService } from '../../../../core/services/notification.service';

declare var $: any;
@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @Input()
  project: any = {};
  @Input()
  mode: String = 'new';
  user: any = {};
  private storeSubscription: ISubscription;
  constructor(private router: Router,
              private store: Store<any>,
              private el: ElementRef,
              private projectService: ProjectService,
              private notificationService: NotificationService) {}
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
  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.project.image = fileList[0];
    }
    this.readURL(event.target);
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
  update() {
    this.projectService.put(this.project)
    .subscribe(() => {
      this.notificationService.showMessage('Project updated successfully!');
    });
  }
}
