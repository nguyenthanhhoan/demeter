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
    }]
  }]
}];

export const routing = RouterModule.forChild(routes);
