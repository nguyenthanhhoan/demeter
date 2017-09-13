import { NavigationEnd, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadedAction } from '../core/actions/actions';
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
    this.storeSubscription = this.store.select('user')
    .subscribe((user: any) => {
      if (user.loaded) {
        this.user = user.user;
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
  confirmRemove(project) {
    this.notificationService.confirm('Do you want to remove this project?')
    .subscribe(() => {
      this.projectService.delete(project.id)
      .subscribe(() => {
        this.loadProjects();
      });
    });
  }
}
