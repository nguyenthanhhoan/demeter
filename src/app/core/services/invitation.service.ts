import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';

@Injectable()
export class InvitationService {

  private resourceUrl = 'user/invitations';
  constructor (private apiService: ApiService) {}

  delete(id): Observable<any> {
    return this.apiService.delete(`${this.resourceUrl}/${id}`);
  }
}
