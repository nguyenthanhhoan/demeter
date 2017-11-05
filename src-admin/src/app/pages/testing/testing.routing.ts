import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TestingComponent } from './testing.component';
import { NotificationComponent } from './notification/notification.component';
import { AlertComponent } from './alert/alert.component';
export const routes: Routes = [{
  path: '',
  component: TestingComponent,
  children: [{
    path: 'notification',
    component: NotificationComponent
  }, {
    path: 'alert',
    component: AlertComponent
  }],
}];

export const routing = RouterModule.forChild(routes);
