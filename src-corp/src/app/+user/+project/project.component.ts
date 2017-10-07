import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { LoadedAction, IdPopulatedAction, ResetAction } from '../../core/actions/project-action';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'project-component',
  template: '<router-outlet></router-outlet>',
})
export class ProjectComponent implements OnInit, OnDestroy {

  private routerSubscription: ISubscription;
  private lastProjectId: string;
  private projectId: string;
  private project: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private store: Store<any>) { }

  ngOnInit() {
    // Clear previous data
    this.store.dispatch(new ResetAction());
    this.subscribeRouterEvent();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(this.handleRouteParam.bind(this));
  }

  handleRouteParam(event) {
    if (event instanceof NavigationEnd) {
      this.projectId = this.route.snapshot.params['id'];

      this.store.dispatch(new IdPopulatedAction({
        projectId: this.projectId
      }));
      if (this.projectId &&
        (typeof this.lastProjectId === 'undefined' || this.lastProjectId !== this.projectId)) {

          this.lastProjectId = this.projectId;
          this.loadZoneDetail();
      }
    }
  }

  loadZoneDetail() {
    this.projectService.getOne(this.projectId).subscribe(data => {
      this.project = data;
      this.store.dispatch(new LoadedAction(data));
    });
  }
}
