import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../_core/api/api.service';
@Injectable()
export class GatewayService {
  /**
   * TODO: Should rename back-end modal Device -> Gateway.
   */
  private gatewaysUrl = 'admin/devices';

  constructor (private apiService: ApiService) {}

  getAll (): Observable<any[]> {
    return this.apiService.fetch(`${this.gatewaysUrl}`);
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.gatewaysUrl}/${id}`);
  }

  post (device): Observable<any[]> {
    return this.apiService.postFormData(`${this.gatewaysUrl}`, device);
  }

  put (device): Observable<any[]> {
    return this.apiService.putFormData(`${this.gatewaysUrl}/${device.id}`, device);
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.gatewaysUrl}/${id}`);
  }
}
