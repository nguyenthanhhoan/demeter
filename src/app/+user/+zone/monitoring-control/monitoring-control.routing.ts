import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [{
  path: 'control',
  loadChildren:
    'app/+user/+zone/monitoring-control/control/zone-control.module#ZoneControlModule'
}, {
  path: 'alert',
  loadChildren:
    'app/+user/+zone/monitoring-control/alert/zone-alert.module#ZoneAlertModule'
}];

export const routing = RouterModule.forChild(routes);
