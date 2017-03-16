import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class ProjectService {
  private projectsUrl = 'projects';

  constructor (private apiService: ApiService) {}

  getProjects (user_id): Observable<any[]> {
    return this.apiService.fetch(`${this.projectsUrl}?user_id=${user_id}`);
  }

  post (project): Observable<any[]> {
    return this.apiService.post(this.projectsUrl, {project: project});
  }
}
