import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { AgribookHomeComponent } from './agribook-home/agribook-home.component';
import { AgribookComponent } from './agribook.component';
import { routing } from './agribook.routing';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    AgribookComponent,
    AgribookHomeComponent
  ],
  providers: [
  ],
})
export class AgribookModule {

}
