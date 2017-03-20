import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { ZoneSummaryPaneComponent } from './zone-summary-pane.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ZoneSummaryPaneComponent
  ],
  exports: [
    ZoneSummaryPaneComponent
  ]
})
export class ZoneSummaryPaneModule {

}
