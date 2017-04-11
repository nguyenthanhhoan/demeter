import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminModule } from '../shared/smartadmin.module';

import { ChartistModule } from '../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from '../shared/forms/validation/smartadmin-validation.module';
import { IntegrationModule } from '../shared/integration/integration.module';

@NgModule({
  imports: [
    SmartadminModule,
    SmartadminValidationModule,
    ChartistModule,
    IntegrationModule
  ],
  declarations: [
  ],
  providers: [
  ],
})
export class UserModule {

}
