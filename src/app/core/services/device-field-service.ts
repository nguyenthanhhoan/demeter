import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class DeviceFieldService {

  constructor (private apiService: ApiService) {}

  getList(): Observable<any[]> {
    return this.apiService.fetch(`user/device_fields`);
  }

  getListUpdatable(): Observable<any[]> {
    return this.apiService.fetch(`user/device_fields/list_device_updatable`);
  }

  getListAssigned(options?): Observable<any[]> {
    return this.apiService.fetch(`user/device_fields/list_device_assigned`, options);
  }

  assignDeviceToZone(data): Observable<any[]> {
    return this.apiService.post(`user/device_fields/assign_device_to_zone`, data);
  }

  unassignDeviceToZone(data): Observable<any[]> {
    return this.apiService.post(`user/device_fields/unassign_device_to_zone`, data);
  }

  updateDeviceValue(data): Observable<any[]> {
    return this.apiService.post(`user/device_fields/update_device_value`, data);
  }
}
