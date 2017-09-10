import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from '../_shared/layout/layout/user-layout.component';
import { UserComponent } from './user.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutComponent,
  children: [{
    path: '',
    component: UserComponent
  }]
}];

export const routing = RouterModule.forChild(routes);
