import { NavigationButtonModel } from '../models/navigation-button.model';

export enum AppMode {
  MOBILE  = 'MOBILE',
  DESKTOP = 'DESKTOP'
}

export const NAVIGATION_BUTTONS: NavigationButtonModel[] = [
  {
    id: 'Dashboard',
    icon: 'assets/img/demeter/icon/DASHBOARD_GREY.png',
    iconActive: 'assets/img/demeter/icon/DASHBOARD.png',
    iconGrey: 'assets/img/demeter/icon/DASHBOARD_GREY.png',
    title: 'Dashboard',
    url: ''
  },
  {
    id: 'History',
    icon: 'assets/img/demeter/icon/HISTORY_GREY.png',
    iconActive: 'assets/img/demeter/icon/HISTORY.png',
    iconGrey: 'assets/img/demeter/icon/HISTORY_GREY.png',
    title: 'History',
    url: 'history'
  },
  {
    id: 'Camera',
    icon: 'assets/img/demeter/icon/CAMERA_GREY.png',
    iconActive: 'assets/img/demeter/icon/CAMERA.png',
    iconGrey: 'assets/img/demeter/icon/CAMERA_GREY.png',
    title: 'Camera',
    url: 'camera'
  },
  {
    id: 'Control',
    icon: 'assets/img/demeter/icon/CONTROL_GREY.png',
    iconActive: 'assets/img/demeter/icon/CONTROL.png',
    iconGrey: 'assets/img/demeter/icon/CONTROL_GREY.png',
    title: 'Control',
    url: 'control'
  },
  {
    id: 'Finance',
    icon: 'assets/img/demeter/icon/FINANCE_GREY.png',
    iconActive: 'assets/img/demeter/icon/FINANCE.png',
    iconGrey: 'assets/img/demeter/icon/FINANCE_GREY.png',
    title: 'Finance',
    url: 'finance'
  },
  {
    id: 'Report',
    icon: 'assets/img/demeter/icon/REPORT_GREY.png',
    iconActive: 'assets/img/demeter/icon/REPORT.png',
    iconGrey: 'assets/img/demeter/icon/REPORT_GREY.png',
    title: 'Report',
    url: 'report'
  },
  {
    id: 'Alert',
    icon: 'assets/img/demeter/icon/ALERT_GREY.png',
    iconActive: 'assets/img/demeter/icon/ALERT.png',
    iconGrey: 'assets/img/demeter/icon/ALERT_GREY.png',
    title: 'Alert',
    url: 'alert'
  },
  {
    id: 'Setting',
    icon: 'assets/img/demeter/icon/SETTINGS_GREY.png',
    iconActive: 'assets/img/demeter/icon/SETTINGS.png',
    iconGrey: 'assets/img/demeter/icon/SETTINGS_GREY.png',
    title: 'Setting',
    url: 'setting'
  }
];
