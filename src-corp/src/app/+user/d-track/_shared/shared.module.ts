import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from '../../_shared/shared.module';
import { UserLayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    UserLayoutModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    AppSharedModule,
  ]
})
export class SharedModule {
}
