import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { AppUtils } from '../../app.utils';
import { ApiService } from '../api/api.service';

@Injectable()
export class OkrObjectiveService {
  private resourceUrl = 'user/okr_objectives';

  constructor (private apiService: ApiService) {}

  getOkrObjectives (): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}`);
  }

  post (okrObjective): Observable<any[]> {
    return this.apiService.post(this.resourceUrl, {
      okr_objective: okrObjective
    });
  }

  put (okrObjective): Observable<any[]> {
    let submitObjective = this.transformSubmitObjective(okrObjective);
    return this.apiService.put(`${this.resourceUrl}/${okrObjective.id}`, {
      okr_objective: submitObjective
    });
  }

  getOne (id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}`);
  }

  delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }

  transformSubmitObjective(objective) {
    let submitObjective = _.clone(objective);
    submitObjective.date_from = AppUtils.getSubmitDate(objective.date_from);
    submitObjective.date_to = AppUtils.getSubmitDate(objective.date_to);

    delete submitObjective.key_results;
    submitObjective.key_results_attributes = objective.key_results.map((element) => {
      return _.clone(element);
    });
    submitObjective.key_results_attributes.forEach(element => {
      element.start_date = AppUtils.getSubmitDate(element.start_date);
      element.original_deadline = AppUtils.getSubmitDate(element.original_deadline);
      element.deadline1 = AppUtils.getSubmitDate(element.deadline1);
      element.pic = element.pic.join('|||');
    });
    return submitObjective;
  }
}
