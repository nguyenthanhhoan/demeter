import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../_core/api/api.service';
@Injectable()
export class GatewayFieldService {
  private devicesUrl = 'admin/devices';

  constructor (private apiService: ApiService) {}

  getAll (device_id): Observable<any[]> {
    return this.apiService.fetch(`${this.devicesUrl}/${device_id}/device_fields`);
  }

  getOne (device_id, id): Observable<any[]> {
    return this.apiService.fetch(`${this.devicesUrl}/${device_id}/device_fields/${id}`);
  }

  post (device_id, field): Observable<any[]> {
    return this.apiService.post(`${this.devicesUrl}/${device_id}/device_fields`, field);
  }

  put (device_id, field): Observable<any[]> {
    return this.apiService
      .put(`${this.devicesUrl}/${device_id}/device_fields/${field.id}`, field);
  }

  public delete(device_id, id): Observable<any> {
    return this.apiService.delete(`${this.devicesUrl}/${device_id}/device_fields/${id}`);
  }
}
