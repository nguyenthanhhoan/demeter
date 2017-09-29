import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [{
  path: 'post',
  loadChildren: 'app/user/agribook-editor/post/post.module#PostModule'
}, {
  path: 'topic',
  loadChildren: 'app/user/agribook-editor/topic/topic.module#TopicModule'
}];

export const routing = RouterModule.forChild(routes);
