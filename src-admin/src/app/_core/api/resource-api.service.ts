import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';

@Injectable()
export class ResourceAPIService {
  protected resourceUrl;
  protected resourceName;
  protected idField;

  constructor (protected apiService: ApiService) {}

  getAll(): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`);
  }

  getOne(id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}`);
  }

  post(data): Observable<any[]> {
    return this.apiService.postFormData(`${this.resourceUrl}`, {
      [`${this.resourceName}`]: data,
    });
  }

  put(data): Observable<any[]> {
    return this.apiService.putFormData(`${this.resourceUrl}/${data[this.idField]}`, {
      [`${this.resourceName}`]: data,
    });
  }

  public delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
