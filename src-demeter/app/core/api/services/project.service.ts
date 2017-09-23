import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

@Injectable()
export class ProjectService {
  private resourceUrl = 'family/projects';

  constructor (private apiService: ApiService) {}

  getProjects (): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`);
  }

  buildFormData(project) {
    let formData: FormData = new FormData();
    if (project.name) {
      formData.append('project[name]', project.name);
    }
    if (project.package_id) {
      formData.append('project[package_id]', project.package_id);
    }
    if (project.camera_id) {
      formData.append('project[camera_id]', project.camera_id);
    }
    if (project.image && project.image.size > 0) {
      formData.append('project[image]', project.image);
    }
    return formData;
  }

  put(project): Observable<any[]> {
    let formData: FormData = this.buildFormData(project);
    return this.apiService.putFormData(`${this.resourceUrl}/${project.id}`, formData);
  }

  post(project): Observable<any[]> {
    let formData: FormData = this.buildFormData(project);
    return this.apiService.postFormData(this.resourceUrl, formData);
  }

  updateImage(project_id, image): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('project[image]', image);
    return this.apiService
            .putFormData(`${this.resourceUrl}/${project_id}`, formData);
  }
  getOne(id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}`);
  }
  delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
