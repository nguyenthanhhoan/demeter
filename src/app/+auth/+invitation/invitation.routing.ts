import { Routes, RouterModule } from '@angular/router';
import { InvitationComponent } from './invitation.component';

const routes: Routes = [{
  path: ':token',
  component: InvitationComponent
}];

export const routing = RouterModule.forChild(routes);
