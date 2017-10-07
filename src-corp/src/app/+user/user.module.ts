import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminModule } from '../shared/smartadmin.module';

import { routing } from './user.routing';
import { ChartistModule } from '../shared/graphs/chartist/chartist.module';
import { SmartadminValidationModule } from '../shared/forms/validation/smartadmin-validation.module';
import { IntegrationModule } from '../shared/integration/integration.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [
    routing,
    SmartadminModule,
    SmartadminValidationModule,
    ChartistModule,
    IntegrationModule,
    ProfileModule
  ],
  declarations: [
  ],
  providers: [
  ],
})
export class UserModule {

}
