import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './list/device-list.component';
import { DeviceFormComponent } from './form/device-form.component';
import { DeviceFieldListComponent } from './device-field/list/device-field-list.component';
import { DeviceFieldFormComponent } from './device-field/form/device-field-form.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: DeviceListComponent
  }, {
    path: 'new', component: DeviceFormComponent
  }, {
    path: ':device_id',
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
  }
];

export const routing = RouterModule.forChild(routes);

export const routedComponents = [
  DeviceListComponent,
  DeviceFormComponent,
  DeviceFieldListComponent,
  DeviceFieldFormComponent
];
