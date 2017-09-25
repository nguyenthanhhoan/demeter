import { setTimeout } from 'timers';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../../../core/api/api.service';
import { LoadedProjectAction, ResetProjectAction } from '../../../core/actions/actions';
import { ProjectService } from '../../../core/api/services/project.service';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: any = {};
  private storeSubscription: ISubscription;
  private routerSubscription: ISubscription;
  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.loaded) {
        this.project = app.project;
      }
    });
    // TODO: Remove timeout technique by subcribing event stream
    // Donot know why subcribing event executed after routing
    setTimeout(() => {
      this.handleRouteParam();
    }, 800);
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.resetProject();
  }

  private resetProject() {
    this.store.dispatch(new ResetProjectAction());
  }

  private handleRouteParam() {
    let projectId;
    let segments = this.route.snapshot['_urlSegment'].segments;
    for (let index = 0; index < segments.length; index++) {
      let element = segments[index];
      if (element.path === 'project') {
        projectId = +segments[index + 1].path;
      }
    }
    if (!projectId) {
      console.error('Cannot found projectId in url!');
    } else {
      // Neet to get the project based on the router segment
      if (!this.project.id || (this.project.id !== projectId)) {
        console.log('Project haven\'n fetch. Need fetching');
        this.projectService.getOne(projectId)
        .subscribe((project) => {
          this.project = project;
          this.store.dispatch(new LoadedProjectAction(project));
        });
      }
    }
  }
}
