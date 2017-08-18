import { NgModule } from '@angular/core';

import { routing } from './user.routing';
import { SharedModule } from '../_shared/shared.module';

import { UserListComponent } from './list/user-list.component';
import { UserFormComponent } from './form/user-form.component';
import { UserService } from './shared/user.service';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  providers: [
    UserService
  ],
})
export class UserModule {

}
