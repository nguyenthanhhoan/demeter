import { SharedModule as AppSharedModule } from '../../../_shared/shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    AppSharedModule
  ],
  declarations: [
  ],
  exports: [
    AppSharedModule
  ]
})
export class SharedModule {
}
