import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { AppUtils } from '../../app.utils';
import { ApiService } from '../api/api.service';

@Injectable()
export class ProgramExecutionService {
  private resourceUrl = 'user/program_executions';

  constructor (private apiService: ApiService) {}

  list(zone_id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}?zone_id=${zone_id}`);
  }

  post(zone_id, program): Observable<any[]> {
    return this.apiService.post(`${this.resourceUrl}?zone_id=${zone_id}`, {
      program_execution: program
    });
  }

  put(zone_id, program): Observable<any[]> {
    return this.apiService.put(`${this.resourceUrl}/${program.id}?zone_id=${zone_id}`, {
      program_execution: program
    });
  }

  getOne(zone_id, id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}?zone_id=${zone_id}`);
  }

  delete(zone_id, id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}?zone_id=${zone_id}`);
  }

  active(zone_id, id): Observable<any> {
    return this.apiService.put(`${this.resourceUrl}/active/${id}?zone_id=${zone_id}`, {});
  }
}
