import { Routes, RouterModule } from '@angular/router';

import {
  UserLayoutProjectListComponent
} from '../shared/layout/user-layout/user-layout-project-list.component';
import { UserLayoutComponent } from '../shared/layout/user-layout/user-layout.component';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectFormComponent } from './form/project-form.component';
import { ProjectSummaryComponent } from './summary/project-summary.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutProjectListComponent,
  children: [{
    path: '',
    component: ProjectListComponent,
  }, {
    path: 'new',
    component: ProjectFormComponent
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
    }]
  }]
}, {
  path: ':id/zone',
  loadChildren: 'app/+user/+zone/zone.module#ZoneModule',
}];

export const routing = RouterModule.forChild(routes);
