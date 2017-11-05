import { NgModule } from '@angular/core';
import { routing } from './testing.routing';
import { SharedModule } from '../../_shared/shared.module';
import { TestingComponent } from './testing.component';
import { NotificationComponent } from './notification/notification.component';
import { TestingService } from './testing.service';
import { AlertComponent } from './alert/alert.component';
@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    TestingComponent,
    NotificationComponent,
    AlertComponent
  ],
  providers: [
    TestingService
  ],
})
export class TestingModule {

}
