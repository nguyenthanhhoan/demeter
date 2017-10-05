import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToggleShowMoreBottomBarAction } from '../../../../../core/actions/actions';
import { NavigationButtonModel } from './model/navigation-button.model';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  navigations: NavigationButtonModel[] = [];
  moreIcon: NavigationButtonModel;
  moreNavigations: NavigationButtonModel[] = [];
  activeNavigation: any;
  isShowMoreBottomBar: boolean = false;

  private storeSubscription: ISubscription;
  private appStateSubscription: ISubscription;
  private project: any = {};
  private user: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.initMainNavigationButtons();
    this.moreIcon = new NavigationButtonModel({
      id: 'More',
      icon: 'assets/img/demeter/icon/MORE_GREY.png',
      iconActive: 'assets/img/demeter/icon/MORE.png',
      iconGrey: 'assets/img/demeter/icon/MORE_GREY.png',
      title: 'More',
      url: 'more',
    });
    this.initMoreNavigationButtons();

    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = app.project;
      }
      if (app.user && app.user.id) {
        this.user = app.user;
      }
    });
    this.appStateSubscription = this.store.select('appState')
    .subscribe((app: any) => {
      this.isShowMoreBottomBar = app.isShowMoreBottomBar;
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

  handleNavigationClick(navigation) {
    if (navigation.id !== 'More') {
      this.activeNavigation = navigation;
      this.router.navigate([`/${this.user.username}/project/${this.project.id}/${navigation.url}`]);
    } else {
      this.isShowMoreBottomBar = !this.isShowMoreBottomBar;
      this.store.dispatch(new ToggleShowMoreBottomBarAction(this.isShowMoreBottomBar));
    }
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
      this.moreNavigations.forEach((navigation) => {
        if (navigation.url === url) {
          this.activeNavigation = navigation;
        }
      });
    }
  }

  private initMainNavigationButtons() {
    let dashboard = new NavigationButtonModel({
      id: 'Dashboard',
      icon: 'assets/img/demeter/icon/DASHBOARD_GREY.png',
      iconActive: 'assets/img/demeter/icon/DASHBOARD.png',
      iconGrey: 'assets/img/demeter/icon/DASHBOARD_GREY.png',
      title: 'Dashboard',
      url: ''
    });
    let history = new NavigationButtonModel({
      id: 'History',
      icon: 'assets/img/demeter/icon/HISTORY_GREY.png',
      iconActive: 'assets/img/demeter/icon/HISTORY.png',
      iconGrey: 'assets/img/demeter/icon/HISTORY_GREY.png',
      title: 'History',
      url: 'history'
    });
    let camera = new NavigationButtonModel({
      id: 'Camera',
      icon: 'assets/img/demeter/icon/CAMERA_GREY.png',
      iconActive: 'assets/img/demeter/icon/CAMERA.png',
      iconGrey: 'assets/img/demeter/icon/CAMERA_GREY.png',
      title: 'Camera',
      url: 'camera'
    });
    let control = new NavigationButtonModel({
      id: 'Control',
      icon: 'assets/img/demeter/icon/CONTROL_GREY.png',
      iconActive: 'assets/img/demeter/icon/CONTROL.png',
      iconGrey: 'assets/img/demeter/icon/CONTROL_GREY.png',
      title: 'Control',
      url: 'control'
    });
    this.navigations.push(dashboard);
    this.navigations.push(history);
    this.navigations.push(camera);
    this.navigations.push(control);
  }

  private initMoreNavigationButtons() {
    let finance = new NavigationButtonModel({
      id: 'Finance',
      icon: 'assets/img/demeter/icon/FINANCE_GREY.png',
      iconActive: 'assets/img/demeter/icon/FINANCE.png',
      iconGrey: 'assets/img/demeter/icon/FINANCE_GREY.png',
      title: 'Finance',
      url: 'finance'
    });
    let report = new NavigationButtonModel({
      id: 'Report',
      icon: 'assets/img/demeter/icon/REPORT_GREY.png',
      iconActive: 'assets/img/demeter/icon/REPORT.png',
      iconGrey: 'assets/img/demeter/icon/REPORT_GREY.png',
      title: 'Report',
      url: 'report'
    });
    let alert = new NavigationButtonModel({
      id: 'Alert',
      icon: 'assets/img/demeter/icon/ALERT_GREY.png',
      iconActive: 'assets/img/demeter/icon/ALERT.png',
      iconGrey: 'assets/img/demeter/icon/ALERT_GREY.png',
      title: 'Alert',
      url: 'alert'
    });
    let setting = new NavigationButtonModel({
      id: 'Setting',
      icon: 'assets/img/demeter/icon/SETTINGS_GREY.png',
      iconActive: 'assets/img/demeter/icon/SETTINGS.png',
      iconGrey: 'assets/img/demeter/icon/SETTINGS_GREY.png',
      title: 'Setting',
      url: 'setting'
    });
    this.moreNavigations.push(finance);
    this.moreNavigations.push(report);
    this.moreNavigations.push(alert);
    this.moreNavigations.push(setting);
  }
}
