import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';

export const routes: Routes = [{
  path: '',
  component: ReportComponent
}];

export const routing = RouterModule.forChild(routes);
