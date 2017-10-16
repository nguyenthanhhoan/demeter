import { NgModule } from '@angular/core';

import { routing, routedComponents } from './family-package.routing';
import { SharedModule } from '../../../_shared/shared.module';
import { PackageService } from './shared/package.service';
import { CustomRenderComponent } from './list/custom-render.component';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ...routedComponents,
    CustomRenderComponent
  ],
  entryComponents: [
    CustomRenderComponent
  ],
  providers: [
    PackageService,
  ],
})
export class FamilyPackageModule {

}
