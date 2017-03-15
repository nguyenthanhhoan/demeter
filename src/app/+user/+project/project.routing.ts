import { Routes, RouterModule } from '@angular/router';
import { ProjectFormComponent } from './form/project-form.component';
import { ModuleWithProviders } from "@angular/core";

export const zoneRoutes: Routes = [
  {
    path: '',
    component: ProjectFormComponent,
    data: {
        pageTitle: 'Project'
    }
  }
];

export const projectRouting: ModuleWithProviders = RouterModule.forChild(zoneRoutes);
