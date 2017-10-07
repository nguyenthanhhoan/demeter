import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../../_core/api/api.service';

@Injectable()
export class PackageService {
  private resourceUrl = 'admin/packages';

  constructor (private apiService: ApiService) {}

  getAll(): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`);
  }

  getOne(id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}`);
  }

  post(data): Observable<any[]> {
    return this.apiService.postFormData(`${this.resourceUrl}`, {
      package: data,
    });
  }

  put(data): Observable<any[]> {
    return this.apiService.putFormData(`${this.resourceUrl}/${data.id}`, {
      package: data,
    });
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
