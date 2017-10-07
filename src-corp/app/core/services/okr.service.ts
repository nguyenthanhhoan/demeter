import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';

@Injectable()
export class OkrService {

  private resourceUrl = 'user/okrs';
  constructor (private apiService: ApiService) {}

  getList(zone_id): Observable<any[]> {
    // return this.jsonApiService.fetch(`/zone/okr.json`);
    return this.apiService.fetch(`${this.resourceUrl}?zone_id=${zone_id}`);
  }

  update_batch(zone_id, data): Observable<any[]> {
    return this.apiService.post(`${this.resourceUrl}/update_batch?zone_id=${zone_id}`, data);
  }

  delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
