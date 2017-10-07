import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
  {
    path: '', component: TaskListComponent
  }
];

export const routing = RouterModule.forChild(routes);
