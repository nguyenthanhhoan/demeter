import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';

@Injectable()
export class AlertRuleService {
  private resourceUrl = 'user/alert_rules';

  constructor (private apiService: ApiService) {}

  list(zone_id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}?zone_id=${zone_id}`);
  }

  post(zone_id, alert_rule_id): Observable<any[]> {
    return this.apiService.post(`${this.resourceUrl}?zone_id=${zone_id}`, {
      alert_rule: alert_rule_id
    });
  }

  put(zone_id, alert_rule_id): Observable<any[]> {
    return this.apiService.put(`${this.resourceUrl}/${alert_rule_id.id}?zone_id=${zone_id}`, {
      alert_rule: alert_rule_id
    });
  }

  getOne(zone_id, id): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${id}?zone_id=${zone_id}`);
  }

  delete(zone_id, id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}?zone_id=${zone_id}`);
  }
}
