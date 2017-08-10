import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from '../_shared/layout/user-layout/user-layout.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectSummaryComponent } from './summary/project-summary.component';
import { UserLayoutProjectListComponent } from '../_shared/layout/user-layout/user-layout-project-list.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutProjectListComponent,
  children: [{
    path: '',
    component: ProjectListComponent,
  }, {
    path: 'new',
    component: ProjectNewComponent
  }]
}, {
  path: ':id',
  component: UserLayoutComponent,
  children: [{
    path: '',
    component: ProjectComponent,
    children: [{
      path: '',
      component: ProjectSummaryComponent,
    }, {
      path: 'setting',
      loadChildren: 'app/+user/+project/setting/project-setting.module#ProjectSettingModule'
    }]
  }]
}, {
  path: ':id/zone',
  loadChildren: 'app/+user/+zone/zone.module#ZoneModule',
}];

export const routing = RouterModule.forChild(routes);
