import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss']
})
export class ProjectSettingComponent implements OnInit {

  activeTab: number = -1;
  projectId: number;
  private routerSubscription: ISubscription;

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscribeRouterEvent();
  }

  ngOnInit() {
    this.store.select('project')
    .takeWhile(() => {
      return (!this.projectId);
    })
    .subscribe((projectModel: any) => {
      if (projectModel.project && projectModel.project.id) {
        this.projectId = projectModel.project.id;
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  subscribeRouterEvent() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.route.snapshot.routeConfig.path === 'member') {
          this.activeTab = 1;
        } else {
          this.activeTab = 0;
        }
      }
    });
  }

  goToProject() {
    if (this.activeTab !== 0) {
      this.router
      .navigate([
        `/user/project/${this.projectId}/setting`
      ]);
    }
  }

  goToMember() {
    if (this.activeTab !== 1) {
      this.router
      .navigate([
        `/user/project/${this.projectId}/setting/member`
      ]);
    }
  }
}
