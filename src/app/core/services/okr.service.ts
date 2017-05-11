import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';

@Injectable()
export class OkrService {

  private okrsUrl = 'user/okrs';
  constructor (private apiService: ApiService) {}

  getList(zone_id): Observable<any[]> {
    // return this.jsonApiService.fetch(`/zone/okr.json`);
    return this.apiService.fetch(`${this.okrsUrl}?zone_id=${zone_id}`);
  }

  update_batch(zone_id, data): Observable<any[]> {
    return this.apiService.post(`${this.okrsUrl}/update_batch?zone_id=${zone_id}`, data);
  }
}
