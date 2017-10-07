import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../../../core/api/api.service';

@Injectable()
export class UserService {
  private resourceUrl = 'admin/users';

  constructor (private apiService: ApiService) {}

  getAll(): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`);
  }

  getOne(id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}`);
  }

  post(user): Observable<any[]> {
    return this.apiService.putFormData(`${this.resourceUrl}`, user);
  }

  put(user): Observable<any[]> {
    return this.apiService.putFormData(`${this.resourceUrl}/${user.id}`, user);
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
