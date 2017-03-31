import {NgModule} from "@angular/core";
import { GoogleAPI } from './gloader';
import { WUndergroundService } from './wunderground/wunderground.service';
import { GSelectLocationComponent } from './g-select-location/g-select-location.component';

@NgModule({
  declarations: [GSelectLocationComponent],
  exports: [GSelectLocationComponent],
  providers: [
    GoogleAPI, 
    WUndergroundService
  ]
})
export class IntegrationModule{ }
