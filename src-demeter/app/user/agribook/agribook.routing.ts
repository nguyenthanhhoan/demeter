import { Routes, RouterModule } from '@angular/router';
import { AgribookComponent } from './agribook.component';
import { AgribookHomeComponent } from './agribook-home/agribook-home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

export const routes: Routes = [{
  path: '',
  component: AgribookComponent,
  children: [{
    path: '',
    loadChildren: 'app/user/agribook/agribook-home/agribook-home.module#AgribookHomeModule'
  }, {
    path: ':id',
    component: PostDetailComponent
  }, {
    path: 'topic/:id',
    component: TopicDetailComponent
  }]
}];

export const routing = RouterModule.forChild(routes);
