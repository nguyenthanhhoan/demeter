import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../_core/api/api.service';

@Injectable()
export class CameraService {
  private camerasUrl = 'admin/cameras';

  constructor (private apiService: ApiService) {}

  getAll (): Observable<any[]> {
    return this.apiService.fetch(`${this.camerasUrl}`);
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.camerasUrl}/${id}`);
  }

  put(camera): Observable<any[]> {
    return this.apiService.put(`${this.camerasUrl}/${camera.id}`, camera);
  }

  post (camera): Observable<any[]> {
    return this.apiService.post(this.camerasUrl, camera);
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.camerasUrl}/${id}`);
  }
}
