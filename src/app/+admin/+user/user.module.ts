import { NgModule } from '@angular/core';
import { routing } from './user.routing';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';

import { UserListComponent } from './list/user-list.component';
import { UserFormComponent } from './form/user-form.component';
import { UserService } from './shared/user.service';

@NgModule({
  imports: [
    SmartadminModule,
    SmartadminDatatableModule,
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
