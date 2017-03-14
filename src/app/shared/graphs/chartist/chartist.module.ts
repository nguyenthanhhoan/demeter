import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistComponent } from './chartist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChartistComponent],
  exports: [ChartistComponent],
})
export class ChartistModule { }
