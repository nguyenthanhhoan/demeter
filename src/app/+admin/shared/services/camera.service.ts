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

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.camerasUrl}/${id}`);
  }
}
