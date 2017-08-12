import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/ng2-bootstrap';
import { SharedModule as AppSharedModule } from '../../_shared/shared.module';

import { EffectivePeriodComponent } from './effective-period/effective-period.component';

@NgModule({
  imports: [
    PaginationModule.forRoot(),
    AppSharedModule
  ],
  declarations: [
    EffectivePeriodComponent
  ],
  exports: [
    PaginationModule,
    AppSharedModule,
    EffectivePeriodComponent
  ]
})
export class SharedModule {
}
