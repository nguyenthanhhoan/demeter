import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from '../../shared/shared.module';
import { MemberComponent } from './dmt-member/dmt-member.component';
import { UserLayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    UserLayoutModule
  ],
  declarations: [
    MemberComponent
  ],
  exports: [
    CommonModule,
    AppSharedModule,
    MemberComponent
  ]
})
export class SharedModule {
}
