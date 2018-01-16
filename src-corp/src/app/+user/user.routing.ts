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
  }, {
    path: 'd-track',
    loadChildren:
    'app/+user/d-track/d-track.module#DTrackModule',
  }
];

export const routing = RouterModule.forChild(routes);
