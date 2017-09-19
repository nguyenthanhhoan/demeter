import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  navigations = [{
    id: 'Dashboard',
    icon: 'assets/img/demeter/icon/DASHBOARD_GREY.png',
    iconActive: 'assets/img/demeter/icon/DASHBOARD.png',
    iconGrey: 'assets/img/demeter/icon/DASHBOARD_GREY.png',
    title: 'Dashboard',
    url: ''
  }, {
    id: 'History',
    icon: 'assets/img/demeter/icon/HISTORY_GREY.png',
    iconActive: 'assets/img/demeter/icon/HISTORY.png',
    iconGrey: 'assets/img/demeter/icon/HISTORY_GREY.png',
    title: 'History',
    url: 'history'
  }, {
    id: 'Camera',
    icon: 'assets/img/demeter/icon/CAMERA_GREY.png',
    iconActive: 'assets/img/demeter/icon/CAMERA.png',
    iconGrey: 'assets/img/demeter/icon/CAMERA_GREY.png',
    title: 'Camera',
    url: 'camera'
  }, {
    id: 'Control',
    icon: 'assets/img/demeter/icon/CONTROL_GREY.png',
    iconActive: 'assets/img/demeter/icon/CONTROL.png',
    iconGrey: 'assets/img/demeter/icon/CONTROL_GREY.png',
    title: 'Control',
    url: 'control'
  }, {
    id: 'Finance',
    icon: 'assets/img/demeter/icon/FINANCE_GREY.png',
    iconActive: 'assets/img/demeter/icon/FINANCE.png',
    iconGrey: 'assets/img/demeter/icon/FINANCE_GREY.png',
    title: 'Finance',
    url: ''
  }, {
    id: 'Report',
    icon: 'assets/img/demeter/icon/REPORT_GREY.png',
    iconActive: 'assets/img/demeter/icon/REPORT.png',
    iconGrey: 'assets/img/demeter/icon/REPORT_GREY.png',
    title: 'Report',
    url: ''
  }, {
    id: 'Setting',
    icon: 'assets/img/demeter/icon/SETTINGS_GREY.png',
    iconActive: 'assets/img/demeter/icon/SETTINGS.png',
    iconGrey: 'assets/img/demeter/icon/SETTINGS_GREY.png',
    title: 'Setting',
    url: 'setting'
  }];
  activeNavigation: any;

  private storeSubscription: ISubscription;
  private project: any = {};
  private user: any = {};
  constructor(private route: ActivatedRoute,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = app.project;
      }
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
    this.findActiveNav();
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  mouseenter(navigation) {
    navigation.icon = navigation.iconActive;
  }
  mouseleave(navigation) {
    navigation.icon = navigation.iconGrey;
  }

  private findActiveNav() {
    this.activeNavigation = this.navigations[0];
    let url;
    let segments = this.route.snapshot['_urlSegment'].segments;
    for (let index = 0; index < segments.length; index++) {
      let element = segments[index];
      if (element.path === 'project') {
        if (segments[index + 2] && segments[index + 2].path) {
          url = segments[index + 2].path;
        }
      }
    }
    if (url) {
      this.navigations.forEach((navigation) => {
        if (navigation.url === url) {
          this.activeNavigation = navigation;
        }
      });
    }
  }
}
