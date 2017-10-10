import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CorporationComponent } from './dmt-corp.component';

export const routes: Routes = [{
  path: '',
  component: CorporationComponent,
  children: [{
    path: 'project',
    loadChildren: './project/project.module#ProjectModule',
  }, {
    path: 'zone',
    loadChildren: './zone/zone.module#ZoneModule',
  }, {
    path: 'camera',
    loadChildren: './camera/camera.module#CameraModule',
  }],
}];

export const routing = RouterModule.forChild(routes);
