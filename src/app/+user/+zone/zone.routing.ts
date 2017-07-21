import { Routes, RouterModule } from '@angular/router';

import { UserLayoutComponent } from '../shared/layout/user-layout/user-layout.component';
import { ZoneListComponent } from './list/zone-list.component';
import { ZoneFormComponent } from './form/zone-form.component';
import { ZoneComponent } from './zone.component';
import { ZoneSummaryComponent } from './summary/zone-summary.component';
import { ZoneHistoryComponent } from './history/zone-history.component';
import { OKRFormComponent } from './crop-management/okr/okr-form/okr-form.component';
import { ZoneOKRComponent } from './crop-management/okr/zone-okr.component';
import {
  ZoneDailyReportComponent
} from './crop-management/daily-report/zone-daily-report.component';
import { ZoneSettingComponent } from './setting/zone-setting.component';
import { ZoneWeatherComponent } from './crop-management/weather/zone-weather.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';
import { ZoneCameraComponent } from './camera/zone-camera.component';

export const routes: Routes = [{
  path: '',
  component: UserLayoutComponent,
  children: [{
    path: ':id',
    component: ZoneListComponent,
  }, {
      path: ':id/zone/new',
      component: ZoneFormComponent
  }, {
    path: ':project_id/zone/:id',
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
        path: 'weather', component: ZoneWeatherComponent
      }, {
        path: 'setting', component: ZoneSettingComponent
      }, {
        path: 'daily-report',
        children: [{
          path: '', component: ZoneDailyReportComponent
        }, {
          path: ':date', component: ZoneDailyReportComponent
        }]
      }, {
        path: 'okr',
        children: [{
          path: '', component: ZoneOKRComponent,
        }, {
          path: ':objective_id', component: OKRFormComponent
        }]
    }]
  }]
}];

export const routing = RouterModule.forChild(routes);
