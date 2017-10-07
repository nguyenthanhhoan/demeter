import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class ProfileService {
  private resourceUrl = 'user/profile';

  constructor (private apiService: ApiService) {}

  buildFormData(user) {
    let formData: FormData = new FormData();
    formData.append('user[full_name]', user.full_name);
    if (user.image && user.image.size > 0) {
      formData.append('user[image]', user.image);
    }
    return formData;
  }

  put(user): Observable<any[]> {
    let formData: FormData = this.buildFormData(user);
    return this.apiService.putFormData(`${this.resourceUrl}`, formData);
  }

  updateImage(image): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('user[image]', image);
    return this.apiService.putFormData(`${this.resourceUrl}`, formData);
  }
}
