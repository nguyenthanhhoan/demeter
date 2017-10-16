import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './list/device-list.component';
import { DeviceFormComponent } from './form/device-form.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: DeviceListComponent
  }, {
    path: 'new', component: DeviceFormComponent
  }, {
    path: ':device_id',
    component: DeviceFormComponent
  }
];

export const routing = RouterModule.forChild(routes);

export const routedComponents = [
  DeviceListComponent,
  DeviceFormComponent
];
