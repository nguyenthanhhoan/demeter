import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document.component';

export const routes: Routes = [
  {
    path: '', component: DocumentComponent
  }
];

export const routing = RouterModule.forChild(routes);
