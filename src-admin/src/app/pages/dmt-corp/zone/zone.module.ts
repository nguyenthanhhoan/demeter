import { NgModule } from '@angular/core';

import { routing, routedComponents } from './zone.routing';
import { SharedModule } from '../../../_shared/shared.module';
import { ZoneService } from './core/zone.service';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ZoneService,
  ],
})
export class ZoneModule {

}
