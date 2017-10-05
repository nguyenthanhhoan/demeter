import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './list/user-list.component';
import { UserFormComponent } from './form/user-form.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
  }, {
    path: 'new', component: UserFormComponent,
  }, {
    path: ':user_id',
    children: [{
      path: '', redirectTo: 'edit', pathMatch: 'full',
    }, {
      path: 'edit', component: UserFormComponent,
    }],
  },
];

export const routing = RouterModule.forChild(routes);
