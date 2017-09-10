import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { routing } from './routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }