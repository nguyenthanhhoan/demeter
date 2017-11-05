import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../_core/api/api.service';

@Injectable()
export class TestingService {
  private resourceUrl = 'admin/testing';

  constructor (private apiService: ApiService) {}

  createNotification(notification): Observable<any[]> {
    return this.apiService.post(`${this.resourceUrl}/notification`, {notification: notification});
  }
}
