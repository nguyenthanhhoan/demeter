import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Angular2TokenService } from 'angular2-token';

import { AppSettings } from '../../app.settings';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class ApiService {

  public replaySubject: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private http: Http,
              private router: Router,
              private notificationService: NotificationService,
              private tokenService: Angular2TokenService) {}

  public fetch(url, options?): Observable<any>{
    return this.tokenService.get(url, options).map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      });
  }

  public fetchExternal(url): Observable<any>{
    return this.http.get(url)
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      });
  }

  public fetchTableData(options) {
    return {
      dom: 'Bfrtip',
      ajax: (data, callback, settings) => {
        this.fetch(options.url)
          .subscribe((tableData) => {
            callback({
              aaData: tableData.slice(0, 100)
            });
          });
      },
      columns: options.columns,
      columnDefs: options.columnDefs
    };
  }

  public post(url, data): Observable<any> {
    return this.tokenService.post(url, JSON.stringify(data))
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      });
  }

  public put(url, data): Observable<any> {
    return this.tokenService.put(url, JSON.stringify(data))
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postFormData(url, formData): Observable<any> {
    let headers = new Headers({
      'access-token': localStorage.getItem('accessToken'),
      'client': localStorage.getItem('client'),
      'expiry': localStorage.getItem('expiry'),
      'tokeni-type': localStorage.getItem('tokenType'),
      'uid': localStorage.getItem('uid')
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.getBaseUrl() + url, formData, options)
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      });
  }

  public putFormData(url, formData): Observable<any> {
    let headers = new Headers({
      'access-token': localStorage.getItem('accessToken'),
      'client': localStorage.getItem('client'),
      'expiry': localStorage.getItem('expiry'),
      'tokeni-type': localStorage.getItem('tokenType'),
      'uid': localStorage.getItem('uid')
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.getBaseUrl() + url, formData, options)
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      });
  }

  public delete(url): Observable<any> {
    return this.tokenService.delete(url).map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      });
  }

  private getBaseUrl(){
    return AppSettings.api;
  }

  private wrapApi(api) {
    let subscription = api.map(this.extractData)
    .subscribe((responseObj) => {
      if (responseObj && responseObj.message) {
        this.notificationService.showMessage(responseObj.message);
      }
      this.replaySubject.next(responseObj);
    }, (error) => {
      return this.handleError(error);
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    if (body){
      return body.data || body;
    } else {
      return {};
    }
  }

  private handleUnAuthorized(error: Response) {
    if (error.status === 401 && error.statusText === 'Unauthorized') {
      const body = error.json() || {};

      // resource_protected is used to differentiate with default devise unauthorized
      // (which is not required login again)
      if (body.type === 'resource_protected') {
        this.showErrorBox(error.statusText, body.error);
      } else {
        console.log('User is unauthorized. Need redirect to login page!');
        this.router.navigate(['/']);
      }
      return true;
    }
  }

  /**
   * Parse the error object, it can be an array or object
   * @param error The error object from server
   */
  private parseErrors(error: Response) {
    let errMsg: string = '';

    try {
      const body = error.json() || '';
      if (body.errors) {
        let {errors} = body;
        if (typeof errors.length === 'undefined') {
          // The formatted returned is object (Ex. Rails ORM validation)
          Object.keys(errors).forEach((key) => {
            errMsg += `<li>${key}: ${errors[key]}</li>`;
          });
        } else {

          // The formatted returned by devise_token_auth
          errMsg = errors.join('\n');
        }
      } else {
        errMsg = body.error || 'Service is temporarily unavailable';
      }
      return errMsg;
    } catch (err) {
      return error['_body'];
    }
  }

  private handleError(error: any) {
    let errMsg: string = '';
    if (error instanceof Response) {
      if (this.handleUnAuthorized(error)) {
        return Observable.throw(error);
      };
      errMsg = this.parseErrors(error);
    } else {

      // Not a Response type, might be network error
      let msgObj = JSON.parse(error._body);
      errMsg = msgObj.error || 'Service is temporarily unavailable';
    }

    this.showErrorBox(error.statusText, errMsg);
    return Observable.throw(error);
  }

  private showErrorBox(title, errMsg) {
    this.notificationService.showErrorMessage(errMsg);
  }
}
