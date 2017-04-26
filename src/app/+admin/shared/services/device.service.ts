import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api/api.service';

@Injectable()
export class DeviceService {
  private devicesUrl = 'admin/devices';

  constructor (private apiService: ApiService) {}

  getAll (): Observable<any[]> {
    return this.apiService.fetch(`${this.devicesUrl}`);
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.devicesUrl}/${id}`);
  }

  post (device): Observable<any[]> {
    return this.apiService.postFormData(`${this.devicesUrl}`, device);
  }

  put (device): Observable<any[]> {
    return this.apiService.putFormData(`${this.devicesUrl}/${device.id}`, device);
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.devicesUrl}/${id}`);
  }
}
