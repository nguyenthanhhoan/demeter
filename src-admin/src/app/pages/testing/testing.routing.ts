import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TestingComponent } from './testing.component';
import { NotificationComponent } from './notification/notification.component';

export const routes: Routes = [{
  path: '',
  component: TestingComponent,
  children: [{
    path: 'notification',
    component: NotificationComponent
  }],
}];

export const routing = RouterModule.forChild(routes);
