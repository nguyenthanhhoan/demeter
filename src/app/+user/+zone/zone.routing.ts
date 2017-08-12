import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from '../_shared/layout/user-layout/user-layout.component';
import { ZoneComponent } from './zone.component';
import { ZoneNewComponent } from './zone-new/zone-new.component';
import { ZoneSummaryComponent } from './summary/zone-summary.component';
import { ZoneHistoryComponent } from './history/zone-history.component';
import { ZoneSettingComponent } from './setting/zone-setting.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutComponent,
  children: [{
      path: 'new',
      component: ZoneNewComponent
  }, {
    path: ':id',
    component: ZoneComponent,
    children: [{
      path: '', redirectTo: 'summary', pathMatch: 'full'
      }, {
        path: 'summary', component: ZoneSummaryComponent
      }, {
        path: 'history', component: ZoneHistoryComponent
      }, {
        path: 'monitoring-control',
        loadChildren: 'app/+user/+zone/monitoring-control/monitoring-control.module#MonitoringControlModule'
      }, {
        path: 'crop-management',
        loadChildren: 'app/+user/+zone/crop-management/crop-management.module#CropManagementModule'
      }, {
        path: 'setting',
        loadChildren: 'app/+user/+zone/setting/zone-setting.module#ZoneSettingModule'
      }
    ]
  }]
}];

export const routing = RouterModule.forChild(routes);
