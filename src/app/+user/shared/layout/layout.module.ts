import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HeaderModule} from "./header/header.module";
import {SidebarModule} from './sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    SidebarModule
  ],
  declarations: [
  ],
  exports:[
    HeaderModule
  ]
})
export class UserLayoutModule{

}
