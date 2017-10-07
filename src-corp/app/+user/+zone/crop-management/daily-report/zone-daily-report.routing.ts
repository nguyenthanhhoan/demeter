import { Routes, RouterModule } from '@angular/router';
import { ZoneDailyReportComponent } from './zone-daily-report.component';

export const routes: Routes = [
  {
    path: '', component: ZoneDailyReportComponent
  }, {
    path: ':date', component: ZoneDailyReportComponent
  }];

export const routing = RouterModule.forChild(routes);
