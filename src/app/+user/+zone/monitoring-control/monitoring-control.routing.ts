import { Routes, RouterModule } from '@angular/router';
import { ZoneCameraComponent } from './camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';
import { ZoneHistoryComponent } from './history/zone-history.component';

export const routes: Routes = [{
  path: 'history', component: ZoneHistoryComponent
}, {
  path: 'camera',
  children: [{
    path: '', component: ZoneCameraComponent
  }, {
    path: ':camera_id', component: ZoneCameraDetailComponent
  }]
}, {
  path: 'control',
  loadChildren:
    'app/+user/+zone/monitoring-control/control/zone-control.module#ZoneControlModule'
}, {
  path: 'alert',
  loadChildren:
    'app/+user/+zone/monitoring-control/alert/zone-alert.module#ZoneAlertModule'
}];

export const routing = RouterModule.forChild(routes);
