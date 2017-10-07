import { Routes, RouterModule } from '@angular/router';

import { ProjectSettingComponent } from './project-setting.component';
import { MemberComponent } from './member/member.component';

export const routes: Routes = [{
  path: '',
  component: ProjectSettingComponent
}, {
  path: 'member',
  component: ProjectSettingComponent
}];

export const routing = RouterModule.forChild(routes);
