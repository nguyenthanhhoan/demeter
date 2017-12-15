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
  private deviceSubscription: ISubscription;
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
        if (this.project && typeof this.project.connected === 'undefined') {
          this.subscribeConnectionStatus();
        }
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
    if (this.deviceSubscription) {
      this.deviceSubscription.unsubscribe();
    }
    this.resetProject();
  }

  private subscribeConnectionStatus() {
    this.deviceSubscription = this.store.select('deviceState')
    .subscribe((state: any) => {
      this.updateProjectConnectedStatus(state);
    });
  }

  private findSerialName(project) {
    let serial_name = '';
    if (project && project.package &&
      project.package.serial_name &&
      project.package.serial_name.length > 0) {

        serial_name = project.package.serial_name;
    };
    return serial_name;
  }

  private updateProjectConnectedStatus(state) {
    let serial_name = this.findSerialName(this.project);
    if (state && state.packages && state.packages.length > 0) {
      for (const singlePackage of state.packages) {
        if (singlePackage && singlePackage.reported && typeof singlePackage.reported.connected !== 'undefined') {

          const { thingName } = singlePackage;
          if (thingName === serial_name) {
            this.project.connected = singlePackage.reported.connected;
            this.store.dispatch(new LoadedProjectAction(this.project));
          }
        }
      }
    }
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
