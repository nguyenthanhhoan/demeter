import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    LayoutModule
  ],
  declarations: [
  ],
  exports: [
    LayoutModule,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {
}