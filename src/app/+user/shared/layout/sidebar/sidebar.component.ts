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

  projectId: number;
  zoneId: number;
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
        this.projectId = projectModel.projectId;
        this.userRole = projectModel.project.current_user_role;
        this.buildViewModel();
      }
    });
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zoneId = zoneModel.zoneId;
        this.projectId = zoneModel.projectId;
        this.userRole = zoneModel.zone.current_user_role;
        this.buildViewModel();
      }
    });
  }

  buildViewModel() {
    if (this.userRole === 'user') {
      this.showSetting = false;
    } else {
      this.showSetting = true;
    }
  }

  ngOnDestroy() {
    this.zoneSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

  goToPage(name) {
    let project_id = this.projectId;
    let zone_id = this.zoneId;

    // If project_id present in url -> it's was link to zone detail page
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
