import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectFormComponent } from './form/project-form.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ProjectListComponent,
  }, {
    path: 'new', component: ProjectFormComponent,
  }, {
    path: ':project_id',
    children: [{
      path: '', redirectTo: 'edit', pathMatch: 'full',
    }, {
      path: 'edit', component: ProjectFormComponent,
    }],
  },
];

export const routing = RouterModule.forChild(routes);

export const routedComponents = [
  ProjectListComponent,
  ProjectFormComponent,
];
