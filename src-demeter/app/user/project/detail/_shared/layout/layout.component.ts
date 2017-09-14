import { Component } from '@angular/core';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
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
    url: ''
  }, {
    id: 'Camera',
    icon: 'assets/img/demeter/icon/CAMERA_GREY.png',
    iconActive: 'assets/img/demeter/icon/CAMERA.png',
    iconGrey: 'assets/img/demeter/icon/CAMERA_GREY.png',
    title: 'Camera',
    url: ''
  }, {
    id: 'Control',
    icon: 'assets/img/demeter/icon/CONTROL_GREY.png',
    iconActive: 'assets/img/demeter/icon/CONTROL.png',
    iconGrey: 'assets/img/demeter/icon/CONTROL_GREY.png',
    title: 'Control',
    url: ''
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
    url: ''
  }];
  activeNavigation: any;

  constructor() {
    this.activeNavigation = this.navigations[0];
  }

  mouseenter(navigation) {
    navigation.icon = navigation.iconActive;
  }
  mouseleave(navigation) {
    navigation.icon = navigation.iconGrey;
  }
}
