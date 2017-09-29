import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [{
  path: '',
  component: ListComponent
}, {
  path: 'new',
  component: AddComponent
}, {
  path: ':id',
  component: EditComponent
}];

export const routing = RouterModule.forChild(routes);
