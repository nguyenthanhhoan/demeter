import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {HeaderModule} from "./header/header.module";
import {SidebarModule} from './sidebar/sidebar.module';

import { UserLayoutComponent } from './user-layout/user-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    SidebarModule
  ],
  declarations: [
    UserLayoutComponent
  ],
  exports:[
    HeaderModule
  ]
})
export class UserLayoutModule{

}
