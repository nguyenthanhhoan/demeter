import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api/api.service';

@Injectable()
export class ProjectService {
  private projectsUrl = 'admin/projects';

  constructor (private apiService: ApiService) {}

  getProjects (): Observable<any[]> {
    return this.apiService.fetch(`${this.projectsUrl}`);
  }

  post (project): Observable<any[]> {
    let formData:FormData = new FormData();
    formData.append('project[name]', project.name);
    formData.append('project[surface]', project.surface);
    formData.append('project[labour]', project.labour);
    formData.append('project[location]', project.location);
    formData.append('project[location_geometry]', project.location_geometry);
    formData.append('project[image]', project.image);
    return this.apiService.postFormData(this.projectsUrl, formData);
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.projectsUrl}/${id}`);
  }
}
