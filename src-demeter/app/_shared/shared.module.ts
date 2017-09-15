import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { SpinnerModule } from './spinner/spinner.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    LayoutModule,
    SpinnerModule
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
    LayoutModule,
    CommonModule,
    FormsModule,
    SpinnerModule
  ]
})
export class SharedModule {
}
