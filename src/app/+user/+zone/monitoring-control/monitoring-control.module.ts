import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './_shared/shared.module';
import { ZoneCameraComponent } from './camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';
import { ZoneHistoryComponent } from './history/zone-history.component';

import { routing } from './monitoring-control.routing';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    ZoneCameraComponent,
    ZoneCameraDetailComponent,
    ZoneHistoryComponent
  ],
  providers: [
  ]
})
export class MonitoringControlModule {

}
