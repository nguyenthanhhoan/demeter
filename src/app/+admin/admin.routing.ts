import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './+dashboard/dashboard.component';
import { ProjectListComponent } from './+project/list/project-list.component';
import { ProjectFormComponent } from './+project/form/project-form.component';

import { ZoneListComponent } from './+zone/list/zone-list.component';
import { CameraListComponent } from './+camera/list/camera-list.component';

export const routes: Routes = [{
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'project',
    component: ProjectListComponent 
  }, { 
    path: 'project/new', component: ProjectFormComponent 
  }, {
    path: 'zone',
    component: ZoneListComponent 
  }, {
    path: 'camera',
    component: CameraListComponent 
  }, { 
    path: 'project/new', component: ProjectFormComponent 
  }, { 
    path: 'project/edit/:id', component: ProjectFormComponent 
  },
];

export const routing = RouterModule.forChild(routes);
