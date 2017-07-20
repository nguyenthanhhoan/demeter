import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';

@Injectable()
export class AlertService {
  private resourceUrl = 'user/alerts';

  constructor (private apiService: ApiService) {}

  list(options): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`, options);
  }
}
