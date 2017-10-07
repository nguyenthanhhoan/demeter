import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule{}
