import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';

@Injectable()
export class AlertService {
  private resourceUrl = 'user/alerts';

  constructor (private apiService: ApiService) {}

  list(zone_id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}?zone_id=${zone_id}`);
  }
}
