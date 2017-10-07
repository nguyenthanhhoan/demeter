import { NgModule } from '@angular/core';

import { routing, routedComponents } from './family-package.routing';
import { SharedModule } from '../../../_shared/shared.module';
import { PackageService } from './shared/package.service';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    PackageService,
  ],
})
export class FamilyPackageModule {

}
