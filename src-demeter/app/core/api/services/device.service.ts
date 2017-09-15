import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';

@Injectable()
export class DeviceService {

  constructor (private apiService: ApiService) {}

  getListAssigned(options?): Observable<any[]> {
    return this.apiService.fetch(`family/devices/list_device_assigned`, options);
  }
}
