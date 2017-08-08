import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as AppSharedModule } from '../../_shared/shared.module';
import { IntegrationModule } from '../../../shared/integration/integration.module';
import { ZoneFormComponent } from './zone-form/zone-form.component';

@NgModule({
  imports: [
    CommonModule,
    IntegrationModule,
    AppSharedModule
  ],
  declarations: [
    ZoneFormComponent
  ],
  exports: [
    CommonModule,
    IntegrationModule,
    AppSharedModule,
    ZoneFormComponent
  ]
})
export class SharedModule {
}
