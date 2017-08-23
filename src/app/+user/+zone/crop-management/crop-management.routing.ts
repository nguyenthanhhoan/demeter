import { OKRFormComponent } from './okr/okr-form/okr-form.component';
import { ZoneOKRComponent } from './okr/zone-okr.component';
import { ZoneDailyReportComponent } from './daily-report/zone-daily-report.component';
import { ZoneWeatherComponent } from './weather/zone-weather.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'weather', component: ZoneWeatherComponent
  }, {
    path: 'daily-report',
    loadChildren:
      'app/+user/+zone/crop-management/daily-report/zone-daily-report.module#ZoneDailyReportModule'
  }, {
    path: 'warning',
    loadChildren:
      'app/+user/+zone/crop-management/warning/warning.module#WarningModule'
  }, {
    path: 'daily-task',
    loadChildren:
      'app/+user/+zone/crop-management/daily-task/daily-task.module#DailyTaskModule'
  }, {
      path: 'okr',
      children:
        [
          {
            path: '', component: ZoneOKRComponent,
          }, {
            path: ':objective_id', component: OKRFormComponent
          }
        ]
  }, {
    path: 'document',
    loadChildren:
      'app/+user/+zone/crop-management/document/document.module#DocumentModule'
  }
];

export const routing = RouterModule.forChild(routes);
