import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { Angular2TokenService } from 'angular2-token';

import { AppSettings } from '../../app.settings';
import { config } from '../../shared/smartadmin.config';
import { NotificationService } from '../../shared/utils/notification.service';

@Injectable()
export class ApiService {

  public replaySubject: ReplaySubject<any> = new ReplaySubject(1);

  constructor(private http: Http,
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
    this.wrapApi(this.tokenService.post(url, JSON.stringify(data)));
    return this.replaySubject;
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
    api.map(this.extractData)
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

  private handleError(error: any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      if (body.errors) {

        // The formatted returned by devise_token_auth
        errMsg = body.errors.join('\n');
      } else {
        errMsg = body.error || 'Service is temporarily unavailable';
      }
    } else {
      let msgObj = JSON.parse(error._body);
      errMsg = msgObj.error || 'Service is temporarily unavailable';
    }

    setTimeout(() => {
      this.notificationService.bigBox({
        title: error.statusText,
        content: errMsg,
        color: '#C46A69',
        icon: 'fa fa-warning shake animated',
        number: '1',
        timeout: 5000
      });
    });
    return Observable.throw(error);
  }
}
