import { state } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSettings } from '../../app.settings';
import { ProjectService } from '../../core/api/services/project.service';
import { NotificationService } from '../../core/services/notification.service';
import * as _ from 'lodash';

declare var $: any;
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any = {};
  projects: any = [];
  private storeSubscription: ISubscription;
  private deviceSubscription: ISubscription;
  private projectsLoaded: boolean = false;
  constructor(private store: Store<any>,
              private router: Router,
              private el: ElementRef,
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
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.deviceSubscription) {
      this.deviceSubscription.unsubscribe();
    }
  }

  updateProjectConnectedStatus(state) {
    if (state && state.packages && state.packages.length > 0) {
      for (const singlePackage of state.packages) {
        if (singlePackage && singlePackage.reported && typeof singlePackage.reported.connected !== 'undefined') {

          const {thingName} = singlePackage;
          const foundProject = this.findProjectByThingName(thingName);
          if (foundProject) {
            foundProject.connected = singlePackage.reported.connected;
          }
        }
      }
    }
  }

  findProjectByThingName(thingName) {
    const foundProject = _.find(this.projects, (project: any) => {
      if (project && project.package &&
        project.package.serial_name &&
        project.package.serial_name.length > 0) {

          return thingName === project.package.serial_name;
      };
    });
    return foundProject;
  }

  loadProjects() {
    // Only getProjects once, since updating the store could lead to reload projects
    if (this.projectsLoaded) return;
    this.projectsLoaded = true;
    this.projectService.getProjects()
    .subscribe((projects) => {
      this.projects = projects;
      this.deviceSubscription = this.store.select('deviceState')
      .subscribe((state: any) => {
        this.updateProjectConnectedStatus(state);
      });

      // Waiting for projects rendered
      setTimeout(() => {
        this.caculateHeightProjectItem();
      }, 100);
    });
  }

  // Make height equals to width
  caculateHeightProjectItem() {
    const projectEl = $(this.el.nativeElement).find('.project-item');
    const width = projectEl.width();
    projectEl.height(width);
    $(this.el.nativeElement).find('.add-item').height(width);
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
