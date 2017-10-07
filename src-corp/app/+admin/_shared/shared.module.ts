import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from '../../shared/shared.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { AdminLayoutModule } from '../shared/layout';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    SmartadminDatatableModule,
    AdminLayoutModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    AppSharedModule,
    SmartadminDatatableModule,
    AdminLayoutModule
  ]
})
export class SharedModule {
}
