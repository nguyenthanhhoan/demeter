import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

@Injectable()
export class ProjectAlertService {
  private resourceUrl = 'family/project_alerts';

  constructor (private apiService: ApiService) {}

  get(project_id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${project_id}`);
  }

  put(project_id, alert): Observable<any[]> {
    return this.apiService.put(`${this.resourceUrl}/${project_id}`, alert);
  }
}
