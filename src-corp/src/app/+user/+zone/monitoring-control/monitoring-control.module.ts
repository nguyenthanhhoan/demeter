import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './_shared/shared.module';
import { ZoneHistoryModule } from './history/zone-history.module';
import { ZoneCameraComponent } from './camera/zone-camera.component';
import { ZoneCameraDetailComponent } from './camera/camera-detail/zone-camera-detail.component';

import { routing } from './monitoring-control.routing';

@NgModule({
  imports: [
    routing,
    SharedModule,
    ZoneHistoryModule
  ],
  declarations: [
    ZoneCameraComponent,
    ZoneCameraDetailComponent
  ],
  providers: [
  ]
})
export class MonitoringControlModule {

}
