import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './camera.component';

export const routes: Routes = [{
  path: '',
  component: CameraComponent
}];

export const routing = RouterModule.forChild(routes);
