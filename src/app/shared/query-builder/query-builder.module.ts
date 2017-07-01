import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryBuilderComponent } from './query-builder.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QueryBuilderComponent],
  exports: [QueryBuilderComponent],
})
export class QueryBuilderModule { }
