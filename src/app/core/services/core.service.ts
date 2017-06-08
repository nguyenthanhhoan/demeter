import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class CoreService {

  constructor (private apiService: ApiService) {}

  register(register): Observable<any[]> {
    return this.apiService.post(`register`, register);
  }

}
