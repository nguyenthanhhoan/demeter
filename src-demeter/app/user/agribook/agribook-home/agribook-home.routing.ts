import { Routes, RouterModule } from '@angular/router';
import { AgribookHomeComponent } from './agribook-home.component';

export const routes: Routes = [{
  path: '',
  component: AgribookHomeComponent
}];

export const routing = RouterModule.forChild(routes);
