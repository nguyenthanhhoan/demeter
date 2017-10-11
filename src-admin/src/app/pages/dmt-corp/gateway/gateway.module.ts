/**
 * TODO: Should rename back-end modal Device -> Gateway.
 */
import { NgModule } from '@angular/core';

import { routing, routedComponents } from './gateway.routing';
import { CustomRenderComponent } from './list/custom-render.component';
import { SharedModule } from '../../../_shared/shared.module';
import { GatewayService } from './core/gateway.service';
import { GatewayFieldService } from './core/gateway-field.service';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ...routedComponents,
    CustomRenderComponent
  ],
  entryComponents: [
    CustomRenderComponent
  ],
  providers: [
    GatewayService,
    GatewayFieldService
  ],
})
export class GatewayModule {

}
