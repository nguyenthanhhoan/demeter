import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { SpinnerModule } from './spinner/spinner.module';
import { ToggleDirective } from './directives/toggle.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    RouterModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    LayoutModule,
    SpinnerModule
  ],
  declarations: [
    ToggleDirective
  ],
  exports: [
    BsDatepickerModule,
    RouterModule,
    LayoutModule,
    CommonModule,
    FormsModule,
    SpinnerModule,
    ToggleDirective
  ]
})
export class SharedModule {
}
