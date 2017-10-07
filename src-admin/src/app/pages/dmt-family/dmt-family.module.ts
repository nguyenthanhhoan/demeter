import { NgModule } from '@angular/core';
import { routing } from './dmt-family.routing';
import { SharedModule } from '../../_shared/shared.module';
import { FamilyComponent } from './dmt-family.component';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    FamilyComponent,
  ],
  providers: [
  ],
})
export class FamilyModule {

}
