import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../api.service';

@Injectable()
export class CoreService {

  constructor (private apiService: ApiService) {}

  register(register): Observable<any[]> {
    return this.apiService.post(`register`, register);
  }

  create_user_from_invitation(user): Observable<any[]> {
    return this.apiService.post(`create_user_from_invitation`, user);
  }

  signUp(user): Observable<any[]> {
    return this.apiService.post(`sign_up`, { user: user });
  }
}
