import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class ProjectService {
  private projectsUrl = 'projects';

  constructor (private apiService: ApiService) {}

  getProjects (): Observable<any[]> {
    return this.apiService.fetch(`${this.projectsUrl}`);
  }

  buildFormData(project) {
    let formData: FormData = new FormData();
    formData.append('project[name]', project.name);
    formData.append('project[surface]', project.surface);
    formData.append('project[labour]', project.labour);
    formData.append('project[location]', project.location);
    formData.append('project[location_geometry]', project.location_geometry);
    if (project.image && project.image.size > 0) {
      formData.append('project[image]', project.image);
    }
    return formData;
  }

  put(project): Observable<any[]> {
    let formData: FormData = this.buildFormData(project);
    return this.apiService.putFormData(`${this.projectsUrl}/${project.id}`, formData);
  }

  post(project): Observable<any[]> {
    let formData: FormData = this.buildFormData(project);
    return this.apiService.postFormData(this.projectsUrl, formData);
  }

  updateImage (project_id, image): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('project[image]', image);
    return this.apiService
            .putFormData(`${this.projectsUrl}/${project_id}`, formData);
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.projectsUrl}/${id}`);
  }
}
