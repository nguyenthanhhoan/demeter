import { NgModule } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { ApiService } from './api/api.service';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  providers: [
    ApiService,
    NotificationService,
  ],
})
export class CoreModule {
}
