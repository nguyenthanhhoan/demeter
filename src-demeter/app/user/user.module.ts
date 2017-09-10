import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../_shared/shared.module';
import { UserComponent } from './user.component';
import { routing } from './user.routing';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [
  ],
})
export class UserModule {

}
