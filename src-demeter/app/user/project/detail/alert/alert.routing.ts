import { Routes, RouterModule } from '@angular/router';
import { AlertComponent } from './alert.component';

export const routes: Routes = [{
  path: '',
  component: AlertComponent
}];

export const routing = RouterModule.forChild(routes);
