import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';

import { AgribookHomeComponent } from './agribook-home.component';
import { TopicComponent } from './topic/topic.component';
import { routing } from './agribook-home.routing';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    AgribookHomeComponent,
    TopicComponent
  ],
  providers: [
  ],
})
export class AgribookHomeModule {

}
