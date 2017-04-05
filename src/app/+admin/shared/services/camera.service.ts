import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api/api.service';

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

  post (camera): Observable<any[]> {
    let formData:FormData = new FormData();
    formData.append('camera[camera_no]', camera.camera_no);
    formData.append('camera[camera_name]', camera.camera_name);
    formData.append('camera[api]', camera.api);
    formData.append('camera[live_hash]', camera.live_hash);
    formData.append('camera[playback_hash]', camera.playback_hash);
    formData.append('camera[secret_id]', camera.secret_id);
    formData.append('camera[channel]', camera.channel);
    formData.append('camera[server]', camera.server);
    return this.apiService.postFormData(this.camerasUrl, formData);
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.camerasUrl}/${id}`);
  }
}
