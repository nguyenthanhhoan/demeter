import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [{
  path: 'post',
  loadChildren: 'app/user/agribook-editor/post/post.module#PostModule'
}];

export const routing = RouterModule.forChild(routes);
