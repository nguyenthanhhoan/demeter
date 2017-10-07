import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { routing } from './document.routing';

import { DocumentComponent } from './document.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    DocumentComponent
  ],
  providers: [
  ]
})
export class DocumentModule {

}
