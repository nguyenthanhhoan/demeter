import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { SpinnerModule } from './spinner/spinner.module';
import { ToggleDirective } from './directives/toggle.directive';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    LayoutModule,
    SpinnerModule,
    ClickOutsideModule
  ],
  declarations: [
    ToggleDirective
  ],
  exports: [
    BsDatepickerModule,
    ModalModule,
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
