import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'demeter-user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userRole: string;
  showSetting: boolean = true;
  private projectSubscription: ISubscription;
  private zoneSubscription: ISubscription;

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectSubscription = this.store.select('project')
    .subscribe((projectModel: any) => {
      if (projectModel.loaded) {
        this.userRole = projectModel.project.current_user_role;
        this.buildViewModel();
      }
    });
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.userRole = zoneModel.zone.current_user_role;
        this.buildViewModel();
      }
    });
  }

  ngOnDestroy() {
    this.zoneSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  buildViewModel() {
    if (this.userRole === 'user') {
      this.showSetting = false;
    } else {
      this.showSetting = true;
    }
  }

  goToPage(name) {
    let segments = this.route.snapshot['_urlSegment'].segments;
    let zone_id, project_id;
    for (let index = 0; index < segments.length; index++) {
      let element = segments[index];
      if (element.path === 'project') {
        project_id = segments[index + 1].path;
      }
      if (element.path === 'zone') {
        zone_id = segments[index + 1].path;
      }
    }

    let url = `/user`;
    if (project_id && zone_id) {
      url += `/project/${project_id}/zone/${zone_id}`;
      this.router.navigate([`${url}/${name}`]);
    } else if (name === 'setting') {
      url += `/project/${project_id}`;
      this.router.navigate([`${url}/${name}`]);
    } else {
      url += `/project/${project_id}`;
      alert ('This page is implementing!');
    }
  }
}
