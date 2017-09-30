import { SharedModule as AppSharedModule } from '../../../_shared/shared.module';
import { NgModule } from '@angular/core';
import { ListPostComponent } from './list-post/list-post.component';

@NgModule({
  imports: [
    AppSharedModule
  ],
  declarations: [
    ListPostComponent
  ],
  exports: [
    AppSharedModule,
    ListPostComponent
  ]
})
export class SharedModule {
}
