import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FamilyComponent } from './dmt-family.component';

export const routes: Routes = [{
  path: '',
  component: FamilyComponent,
  children: [{
    path: 'package',
    loadChildren: './family-package/family-package.module#FamilyPackageModule',
  }],
}];

export const routing = RouterModule.forChild(routes);
