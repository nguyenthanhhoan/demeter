import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../_core/api/api.service';

@Injectable()
export class ZoneService {
  private zonesUrl = 'admin/zones';

  constructor (private apiService: ApiService) {}

  getAll (): Observable<any[]> {
    return this.apiService.fetch(`${this.zonesUrl}`);
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.zonesUrl}/${id}`);
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.zonesUrl}/${id}`);
  }
}
