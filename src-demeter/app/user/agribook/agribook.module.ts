import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgribookComponent } from './agribook.component';
import { routing } from './agribook.routing';

@NgModule({
  imports: [
    routing
  ],
  declarations: [
    AgribookComponent
  ],
  providers: [
  ],
})
export class AgribookModule {

}
