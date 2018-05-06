import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api.service';

@Injectable()
export class ProfileService {
  private resourceUrl = 'family/profile';

  constructor (private apiService: ApiService) {}

  buildFormData(user) {
    let formData: FormData = new FormData();
    if (user.first_name) {
      formData.append('user[first_name]', user.first_name);
    }
    if (user.last_name) {
      formData.append('user[last_name]', user.last_name);
    }
    if (user.email) {
        formData.append('user[email]', user.email);
    }
    return formData;
  }

  put(user): Observable<any[]> {
    let formData: FormData = this.buildFormData(user);
    return this.apiService.putFormData(`${this.resourceUrl}`, formData);
  }

  updatePassword(user): Observable<any[]> {
    return this.apiService.putFormData(`${this.resourceUrl}/update_password`, {
      user: user
    });
  }
}
