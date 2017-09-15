import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';

export const routes: Routes = [{
  path: '',
  component: HistoryComponent
}];

export const routing = RouterModule.forChild(routes);
