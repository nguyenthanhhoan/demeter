import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UtilsModule } from './utils/utils.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    TranslateModule,
    LayoutModule
  ],
  declarations: [
  ],
  exports: [
    UtilsModule,
    LayoutModule,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {
}