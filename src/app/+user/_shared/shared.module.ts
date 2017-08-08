import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from '../../shared/shared.module';
import { MemberComponent } from './dmt-member/dmt-member.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule
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
