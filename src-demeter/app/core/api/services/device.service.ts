import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';

@Injectable()
export class DeviceService {

  private resourceUrl = 'family/devices';
  constructor (private apiService: ApiService) {}

  getListAssigned(options?): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/list_device_assigned`, options);
  }

  put(device): Observable<any[]> {
    return this.apiService.put(`${this.resourceUrl}/${device.uuid}`, device);
  }
}
