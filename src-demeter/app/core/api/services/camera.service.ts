import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

@Injectable()
export class CameraService {
  private resourceUrl = 'family/cameras';

  constructor (private apiService: ApiService) {}

  getCameras(project_id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}?project_id=${project_id}`);
  }

  put(camera): Observable<any[]> {
    return this.apiService.putFormData(`${this.resourceUrl}/${camera.id}`, camera);
  }

  post(camera): Observable<any[]> {
    return this.apiService.postFormData(this.resourceUrl, camera);
  }

  delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
