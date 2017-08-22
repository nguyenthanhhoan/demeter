import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { routing } from './warning.routing';

import { WarningComponent } from './warning.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    WarningComponent
  ],
  providers: [
  ]
})
export class WarningModule {

}
