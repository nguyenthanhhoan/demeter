import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';

import { ResetAction as ProjectResetAction } from '../../../../core/actions/project-action';
import { ResetAction } from '../../../../core/actions/zone-action';

@Component({
  selector: 'app-user-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  resources: any[];
  project: any = {};
  zone: any = {};

  private projectSubscription: ISubscription;
  private zoneSubscription: ISubscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.update();
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new ProjectResetAction());
    this.projectSubscription = this.store.select('project')
    .subscribe((projectModel: any) => {
      if (projectModel.project && projectModel.project.id) {
        this.project = projectModel.project;
      }
    });

    this.store.dispatch(new ResetAction());
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.zone && zoneModel.zone.id) {
        this.zone = zoneModel.zone;
        this.project = zoneModel.zone.project;
      }
    });
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.zoneSubscription.unsubscribe();
  }

  update() {
    let segments = this.route.snapshot['_urlSegment'].segments;

    this.resources = [];

    let index = 1;
    while (index < segments.length - 1) {
      let resource_name = segments[index].path;

      // The project/zone built from store
      if (resource_name === 'project' || resource_name === 'zone') {
        index += 2;
        continue;
      }

      // This sub-module doest count in breadcrumb
      if (resource_name === 'monitoring-control') {
        index += 1;
        continue;
      }

      let resource_id = '';
      if (segments[index + 1]) {
        resource_id = segments[index + 1].path;
      }

      index += 1;
      let path;

      // TODO: Fix later
      // For the last segment, only get the resource
      // if (index !== segments.length - 2) {
      //   path = `${resource_name}/${resource_id}`;
      // } else {
      //   path = `${resource_name}`;
      // }

      // if (index > 1) {
      //   let lastPath = this.resources[this.resources.length - 1].path;
      //   path = lastPath + `/${path}`;
      // }

      // resource_name = resource_name.charAt(0).toUpperCase() + resource_name.slice(1);
      // if (resource_name === 'Okr') {
      //   resource_name = resource_name.toUpperCase();
      // }
      // this.resources.push({
      //   name: resource_name,
      //   path: path
      // });
    }
  }
}
