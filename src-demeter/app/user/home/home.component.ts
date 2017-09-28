import { NavigationEnd, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProjectService } from '../../core/api/services/project.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any = {};
  projects: any = [];
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private router: Router,
              private projectService: ProjectService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.user && app.user.id) {
        this.user = app.user;
        this.loadProjects();
      }
    });
  }
  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
  loadProjects() {
    this.projectService.getProjects()
    .subscribe((projects) => {
      this.projects = projects;
    });
  }
  confirmRemove($event, project) {
    $event.stopPropagation();
    this.notificationService.confirm('Do you want to remove this project?')
    .subscribe(() => {
      this.projectService.delete(project.id)
      .subscribe(() => {
        this.notificationService.showMessage('Project was removed successfull!');
        this.loadProjects();
      });
    });
  }

  navigateToProject(id) {
    let { user } = this;
    this.router.navigate([`/${user.username}/project/${id}`]);
  }
}
