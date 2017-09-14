import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from '../_shared/layout/layout/user-layout.component';
import { ProjectNewComponent } from './project-new/project-new.component';

export const routes: Routes = [{
  path: 'new',
  component: ProjectNewComponent
}, {
  path: ':id',
  loadChildren: 'app/user/project/detail/project-detail.module#ProjectDetailModule'
}];

export const routing = RouterModule.forChild(routes);
