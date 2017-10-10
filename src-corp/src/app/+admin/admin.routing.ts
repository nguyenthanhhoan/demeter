import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './+dashboard/dashboard.component';
import { ProjectListComponent } from './+project/list/project-list.component';
import { ProjectFormComponent } from './+project/form/project-form.component';

import { ZoneListComponent } from './+zone/list/zone-list.component';
import { CameraListComponent } from './+camera/list/camera-list.component';

import { DeviceListComponent } from './+device/list/device-list.component';
import { DeviceFormComponent } from './+device/form/device-form.component';

import { DeviceFieldListComponent } from './+device/device-field/list/device-field-list.component';
import { DeviceFieldFormComponent } from './+device/device-field/form/device-field-form.component';

export const routes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children:
      [{
        path: 'dashboard',
        component: DashboardComponent,
      }, {
        path: 'camera',
        loadChildren:
          'app/+admin/+camera/camera.module#CameraModule'
      }, {
        path: 'device',
        component: DeviceListComponent
      }, {
        path: 'project/new', component: ProjectFormComponent
      }, {
        path: 'project/edit/:id', component: ProjectFormComponent
      }, {
        path: 'device/new', component: DeviceFormComponent
      }, {
        path: 'device/:device_id',
        children: [{
          path: '', redirectTo: 'edit', pathMatch: 'full'
        }, {
          path: 'edit', component: DeviceFormComponent
        }, {
          path: 'field', component: DeviceFieldListComponent,
        }, {
          path: 'field/new', component: DeviceFieldFormComponent
        }, {
          path: 'field/:field_id',
          children: [{
            path: '', redirectTo: 'edit', pathMatch: 'full'
          }, {
            path: 'edit', component: DeviceFieldFormComponent
          }]
        }]
      }, {
        path: 'user',
        loadChildren:
          'app/+admin/+user/user.module#UserModule',
      }]
  }
];

export const routing = RouterModule.forChild(routes);
