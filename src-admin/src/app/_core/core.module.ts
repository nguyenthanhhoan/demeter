import { NgModule } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { ApiService } from './api/api.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  providers: [
    ApiService,
    NotificationService,
    AuthService,
  ],
})
export class CoreModule {
}
