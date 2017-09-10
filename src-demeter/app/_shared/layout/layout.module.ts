import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyLayoutComponent } from './layout/empty-layout.component';
import { UserLayoutComponent } from './layout/user-layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    EmptyLayoutComponent,
    UserLayoutComponent
  ],
  exports: [
  ]
})
export class LayoutModule { }
