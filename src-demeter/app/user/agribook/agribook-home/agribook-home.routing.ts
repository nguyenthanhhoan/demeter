import { Routes, RouterModule } from '@angular/router';
import { AgribookHomeComponent } from './agribook-home.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [{
  path: '',
  component: AgribookHomeComponent
}, {
  path: 'search',
  component: SearchComponent
}];

export const routing = RouterModule.forChild(routes);
