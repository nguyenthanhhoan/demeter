import { RouterModule, Routes } from '@angular/router';

import { PackageListComponent } from './list/package-list.component';
import { PackageFormComponent } from './form/package-form.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: PackageListComponent,
  }, {
    path: 'new', component: PackageFormComponent,
  }, {
    path: ':package_id',
    children: [{
      path: '', redirectTo: 'edit', pathMatch: 'full',
    }, {
      path: 'edit', component: PackageFormComponent,
    }],
  },
];

export const routing = RouterModule.forChild(routes);

export const routedComponents = [
  PackageListComponent,
  PackageFormComponent,
];
