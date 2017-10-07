import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserSimpleLayoutComponent } from './_shared/layout/user-layout/user-simple-layout.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'project', pathMatch: 'full'
  }, {
    path: 'project',
    loadChildren:
    'app/+user/+project/project.module#ProjectModule',
  }, {
    path: 'profile',
    component: UserSimpleLayoutComponent,
    children: [{
      path: '',
      component: ProfileComponent,
    }]
  }
];

export const routing = RouterModule.forChild(routes);
