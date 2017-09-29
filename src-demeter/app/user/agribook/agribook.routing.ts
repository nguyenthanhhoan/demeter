import { Routes, RouterModule } from '@angular/router';
import { AgribookComponent } from './agribook.component';
import { AgribookHomeComponent } from './agribook-home/agribook-home.component';

export const routes: Routes = [{
  path: '',
  component: AgribookComponent,
  children: [{
    path: '',
    component: AgribookHomeComponent,
  //   children: [{
  //     path: '',
  //     component: HomeComponent,
  //   }, {
  //     path: 'project',
  //     loadChildren: 'app/user/project/project.module#ProjectModule'
  //   }, {
  //     path: 'about',
  //     loadChildren: 'app/user/about/about.module#AboutModule'
  //   }]
  }]
}];

export const routing = RouterModule.forChild(routes);
