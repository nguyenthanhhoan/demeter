import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as AppSharedModule } from '../../../../_shared/shared.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    AppSharedModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class SharedModule {
}
