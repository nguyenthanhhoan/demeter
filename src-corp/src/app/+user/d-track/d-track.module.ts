import { NgModule } from '@angular/core';
import { SharedModule } from './_shared/shared.module';
import { routing } from './d-track.routing';
import { DTrackComponent } from './d-track.component';
import { BrandNewComponent } from './brand-new/brand-new.component';
import { BrandListComponent } from './brand-list/brand-list.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    DTrackComponent,
    BrandNewComponent,
    BrandListComponent
  ]
})
export class DTrackModule { }
