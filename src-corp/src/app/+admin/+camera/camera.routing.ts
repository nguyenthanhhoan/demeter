import { Routes, RouterModule } from '@angular/router';

import { CameraListComponent } from './list/camera-list.component';
import { CameraFormComponent } from './form/camera-form.component';

export const routes: Routes = [{
  path: '',
  component: CameraListComponent
}, {
  path: 'new',
  component: CameraFormComponent
}, {
  path: ':camera_id',
  component: CameraFormComponent
}];

export const routing = RouterModule.forChild(routes);
