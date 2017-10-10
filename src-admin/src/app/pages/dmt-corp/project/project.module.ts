import { NgModule } from '@angular/core';

import { routing, routedComponents } from './project.routing';
import { SharedModule } from '../../../_shared/shared.module';
import { ProjectService } from './core/project.service';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProjectService,
  ],
})
export class ProjectModule {

}
