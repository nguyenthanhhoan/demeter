import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from '../shared/layout/user-layout/user-layout.component';
import { ZoneFormComponent } from './form/zone-form.component';
import { ZoneComponent } from './zone.component';
import { ZoneSummaryComponent } from './summary/zone-summary.component';
import { ZoneHistoryComponent } from './history/zone-history.component';
import { ZoneSettingComponent } from './setting/zone-setting.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';
import { ZoneCameraComponent } from './camera/zone-camera.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutComponent,
  children: [{
      path: 'new',
      component: ZoneFormComponent
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
        path: 'camera',
        children: [{
          path: '', component: ZoneCameraComponent
        }, {
          path: ':camera_id', component: ZoneCameraDetailComponent
        }]
      }, {
        path: 'monitoring-control',
        loadChildren:
          'app/+user/+zone/monitoring-control/monitoring-control.module#MonitoringControlModule',
      }, {
        path: 'crop-management',
        loadChildren:
          'app/+user/+zone/crop-management/crop-management.module#CropManagementModule',
      }, {
        path: 'setting', component: ZoneSettingComponent
      }
    ]
  }]
}];

export const routing = RouterModule.forChild(routes);
