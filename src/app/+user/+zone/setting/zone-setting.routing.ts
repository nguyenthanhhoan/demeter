import { Routes, RouterModule } from '@angular/router';

import { ZoneSettingComponent } from './zone-setting.component';
import { MemberComponent } from './member/member.component';

export const routes: Routes = [{
  path: '',
  component: ZoneSettingComponent
}, {
  path: 'member',
  component: ZoneSettingComponent
}, {
  path: 'summary',
  component: ZoneSettingComponent
}, {
  path: 'camera',
  component: ZoneSettingComponent
}, {
  path: 'environment',
  component: ZoneSettingComponent
}, {
  path: 'control',
  component: ZoneSettingComponent
}];

export const routing = RouterModule.forChild(routes);
