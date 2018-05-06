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
    }, {
      path: 'about',
      loadChildren: 'app/user/about/about.module#AboutModule'
    }, {
      path: 'profile',
      loadChildren: 'app/user/profile/profile.module#ProfileModule'
    }, {
      path: 'agribook',
      loadChildren: 'app/user/agribook/agribook.module#AgribookModule'
    }, {
      path: 'agribook-editor',
      loadChildren: 'app/user/agribook-editor/agribook-editor.module#AgribookEditorModule'
    }]
  }]
}];

export const routing = RouterModule.forChild(routes);
