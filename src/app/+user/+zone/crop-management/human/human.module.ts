import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { routing } from './human.routing';

import { HumanComponent } from './human.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    HumanComponent
  ],
  providers: [
  ]
})
export class HumanModule {

}
