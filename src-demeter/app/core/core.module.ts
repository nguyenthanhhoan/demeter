import { NgModule } from '@angular/core';
import { JsonApiService } from './api/json-api.service';
import { ApiService } from './api/api.service';
import { CoreService } from './api/services/core.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { ProjectService } from './api/services/project.service';
import { SensorDataService } from './api/services/sensor-data.service';
import { DeviceService } from './api/services/device.service';
import { ProjectAlertService } from './api/services/project-alert.service';

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    JsonApiService,
    ApiService,
    CoreService,
    AuthGuard,
    AuthService,
    NotificationService,
    ProjectService,
    SensorDataService,
    DeviceService,
    ProjectAlertService
  ]
})
export class CoreModule {
}
