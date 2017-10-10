import { NgModule } from '@angular/core';
import { routing } from './dmt-corp.routing';
import { SharedModule } from '../../_shared/shared.module';
import { CorporationComponent } from './dmt-corp.component';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    CorporationComponent,
  ],
  providers: [
  ],
})
export class CorporationModule {

}
