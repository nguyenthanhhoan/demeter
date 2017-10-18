import { NgModule } from '@angular/core';

import { routing, routedComponents } from './device.routing';
import { SharedModule } from '../../../../_shared/shared.module';
import { DeviceService } from './core/device.service';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DeviceService
  ],
})
export class DeviceModule {

}
