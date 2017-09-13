import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from '../_shared/layout/layout/user-layout.component';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutComponent,
  children: [{
    path: '',
    component: UserComponent,
    children: [{
      path: '',
      component: HomeComponent,
    }, {
      path: 'project',
      loadChildren: 'app/user/project/project.module#ProjectModule'
    }]
  }]
}];

export const routing = RouterModule.forChild(routes);
