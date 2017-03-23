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
    let formData:FormData = new FormData();
    formData.append('project[name]', project.name);
    formData.append('project[surface]', project.surface);
    formData.append('project[labour]', project.labour);
    formData.append('project[location]', project.location);
    formData.append('project[image]', project.image);
    formData.append('project[user_id]', project.user_id);
    return this.apiService.postFormData(this.projectsUrl, formData);
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.projectsUrl}/${id}`);
  }
}
