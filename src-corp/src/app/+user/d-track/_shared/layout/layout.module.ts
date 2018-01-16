import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from './sidebar/sidebar.module';
import { HeaderModule } from './header/header.module';

import { UserLayoutComponent } from './user-layout/user-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    HeaderModule
  ],
  declarations: [
    UserLayoutComponent
  ],
  exports: [
  ]
})
export class UserLayoutModule {

}
