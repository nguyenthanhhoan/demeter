import { RouterModule, Routes } from '@angular/router';
import { ZoneListComponent } from './list/zone-list.component';
import { ZoneFormComponent } from './form/zone-form.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ZoneListComponent,
  }, {
    path: 'new', component: ZoneFormComponent,
  }, {
    path: ':zone_id',
    children: [{
      path: '', redirectTo: 'edit', pathMatch: 'full',
    }, {
      path: 'edit', component: ZoneFormComponent,
    }],
  },
];

export const routing = RouterModule.forChild(routes);

export const routedComponents = [
  ZoneListComponent,
  ZoneFormComponent,
];
