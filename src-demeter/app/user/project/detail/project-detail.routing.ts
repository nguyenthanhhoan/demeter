import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_shared/layout/layout.component';
import { ProjectDetailComponent } from './project-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [{
    path: '',
    component: ProjectDetailComponent,
    children: [{
      path: '',
      loadChildren: 'app/user/project/detail/dashboard/dashboard.module#DashboardModule'
    }, {
      path: 'history',
      loadChildren: 'app/user/project/detail/history/history.module#HistoryModule'
    }, {
      path: 'camera',
      loadChildren: 'app/user/project/detail/camera/camera.module#CameraModule'
    }, {
      path: 'control',
      loadChildren: 'app/user/project/detail/control/control.module#ControlModule'
    }, {
      path: 'finance',
      loadChildren: 'app/user/project/detail/finance/finance.module#FinanceModule'
    }, {
      path: 'report',
      loadChildren: 'app/user/project/detail/report/report.module#ReportModule'
    }, {
      path: 'setting',
      loadChildren: 'app/user/project/detail/setting/setting.module#SettingModule'
    }]
  }]
}];

export const routing = RouterModule.forChild(routes);
