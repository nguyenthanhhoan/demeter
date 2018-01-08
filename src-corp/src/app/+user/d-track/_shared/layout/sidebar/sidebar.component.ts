import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'd-track-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userRole: string;
  showSetting: boolean = true;
  mode: string;
  private projectId: string;
  private zoneId: string;
  private projectSubscription: ISubscription;
  private zoneSubscription: ISubscription;

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectSubscription = this.store.select('project')
    .subscribe((projectModel: any) => {
      if (projectModel.loaded && this.mode === 'project') {
        this.userRole = projectModel.project.current_user_role;
        this.buildViewModel();
      }
    });
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded && this.mode === 'zone') {
        this.userRole = zoneModel.zone.current_user_role;
        this.buildViewModel();
      }
    });
    this.checkMode();
  }

  checkMode() {
    let segments = this.route.snapshot['_urlSegment'].segments;
    for (let index = 0; index < segments.length; index++) {
      let element = segments[index];
      if (element.path === 'project') {
        if (segments[index + 1].path !== 'new') {
          this.projectId = segments[index + 1].path;
        }
      }
      if (element.path === 'zone') {
        if (segments[index + 1].path !== 'new') {
          this.zoneId = segments[index + 1].path;
        }
      }
    }

    if (this.projectId && this.zoneId) {
      this.mode = 'zone';
    } else {
      this.mode = 'project';
    }
  }

  ngOnDestroy() {
    this.zoneSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  buildViewModel() {
    if (this.userRole === 'user' || this.userRole === 'guest') {
      this.showSetting = false;
    } else {
      this.showSetting = true;
    }
  }

  goToPage(name) {
    let url = `/user`;
    if (this.mode === 'zone') {
      url += `/project/${this.projectId}/zone/${this.zoneId}`;
      this.router.navigate([`${url}/${name}`]);
    } else if (name === 'setting') {
      url += `/project/${this.projectId}`;
      this.router.navigate([`${url}/${name}`]);
    } else {
      url += `/project/${this.projectId}`;
      alert ('This page is implementing!');
    }
  }
}
