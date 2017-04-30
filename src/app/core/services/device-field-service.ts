import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class DeviceFieldService {

  constructor (private apiService: ApiService) {}

  getList (): Observable<any[]> {
    return this.apiService.fetch(`user/device_fields`);
  }
}
