import { NgModule } from '@angular/core';
import { GoogleAPI } from './gloader';
import { GSelectLocationComponent } from './g-select-location/g-select-location.component';

@NgModule({
  declarations: [GSelectLocationComponent],
  exports: [GSelectLocationComponent],
  providers: [
    GoogleAPI
  ]
})
export class IntegrationModule{ }
