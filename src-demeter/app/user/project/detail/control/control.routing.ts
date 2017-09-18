import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from './control.component';

export const routes: Routes = [{
  path: '',
  component: ControlComponent
}];

export const routing = RouterModule.forChild(routes);
