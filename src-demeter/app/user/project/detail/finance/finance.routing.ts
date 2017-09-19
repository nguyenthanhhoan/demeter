import { Routes, RouterModule } from '@angular/router';
import { FinanceComponent } from './finance.component';

export const routes: Routes = [{
  path: '',
  component: FinanceComponent
}];

export const routing = RouterModule.forChild(routes);
