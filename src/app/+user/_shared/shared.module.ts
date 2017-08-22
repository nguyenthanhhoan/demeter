import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from '../../shared/shared.module';
import { MemberComponent } from './dmt-member/dmt-member.component';
import { DateFilterComponent } from './dmt-date-filter/dmt-date-filter.component';
import { UserLayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    UserLayoutModule
  ],
  declarations: [
    MemberComponent,
    DateFilterComponent
  ],
  exports: [
    CommonModule,
    AppSharedModule,
    MemberComponent,
    DateFilterComponent
  ]
})
export class SharedModule {
}
