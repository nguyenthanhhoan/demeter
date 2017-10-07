import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToggleShowMoreBottomBarAction } from '../../../../../core/actions/actions';
import { NavigationButtonModel } from './models/navigation-button.model';
import {
  AppMode,
  NAVIGATION_BUTTONS
} from './const/const';
import { AppModeService } from './services/app-mode.service';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [AppModeService]
})
export class LayoutComponent implements OnInit, OnDestroy {
  navigations: NavigationButtonModel[] = [];
  moreIcon: NavigationButtonModel;
  moreNavigations: NavigationButtonModel[] = [];
  activeNavigation: any;
  isShowMoreBottomBar: boolean = false;
  appMode: AppMode = AppMode.MOBILE;

  private storeSubscription: ISubscription;
  private appStateSubscription: ISubscription;
  private project: any = {};
  private user: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<any>,
              private appModeService: AppModeService) {
  }

  isMobileMode(): boolean {
    return this.appMode === AppMode.MOBILE;
  }

  isDesktopMode(): boolean {
    return this.appMode === AppMode.DESKTOP;
  }

  ngOnInit() {
    this.appMode = this.appModeService.getAppMode();
    // initialize navigation buttons list
    switch (this.appMode) {
      case AppMode.DESKTOP:
        this.initNavigationsForDesktopMode();
        break;
      case AppMode.MOBILE:
      default:
        this.initNavigationsForMobileMode();
    }

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

  private initNavigationsForDesktopMode() {
    this.navigations = NAVIGATION_BUTTONS;
  }

  private initNavigationsForMobileMode() {
    let numOfButtonInMainNavigationBar = 4;
    for (let i = 0; i < numOfButtonInMainNavigationBar; i++) {
      this.navigations.push(NAVIGATION_BUTTONS[i]);
    }
    this.moreIcon = new NavigationButtonModel({
      id: 'More',
      icon: 'assets/img/demeter/icon/MORE_GREY.png',
      iconActive: 'assets/img/demeter/icon/MORE.png',
      iconGrey: 'assets/img/demeter/icon/MORE_GREY.png',
      title: 'More',
      url: 'more',
    });
    for (let i = numOfButtonInMainNavigationBar; i < NAVIGATION_BUTTONS.length; i++) {
      this.moreNavigations.push(NAVIGATION_BUTTONS[i]);
    }
  }
}
