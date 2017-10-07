import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../core/api/api.service';

@Injectable()
export class InvitationService {
  private resourceUrl = 'invitations';

  constructor (private apiService: ApiService) {}

  getByToken(token): Observable<any[]> {
    return this.apiService.fetch(`${this.resourceUrl}/${token}`);
  }
}
