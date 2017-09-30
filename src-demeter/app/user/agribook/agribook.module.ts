import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgribookComponent } from './agribook.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { routing } from './agribook.routing';
import { SharedModule } from './_shared/shared.module';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    AgribookComponent,
    PostDetailComponent,
    TopicDetailComponent
  ],
  providers: [
  ],
})
export class AgribookModule {

}
