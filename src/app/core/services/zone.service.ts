import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class ZoneService {

  constructor (private apiService: ApiService) {}

  getList (user_id, project_id): Observable<any[]> {
    return this.apiService.fetch(`projects/${project_id}/zones?user_id=${user_id}`);
  }

  post (user_id, project_id, zone): Observable<any[]> {
    return this.apiService.post(`projects/${project_id}/zones?user_id=${user_id}`, {
      zone: zone
    });
  }

  getOne (project_id, id): Observable<any[]> {
    return this.apiService.fetch(`projects/${project_id}/zones/${id}`);
  }
}
