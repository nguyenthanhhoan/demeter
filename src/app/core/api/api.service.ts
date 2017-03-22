import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";

import {config} from '../../shared/smartadmin.config';
import {NotificationService} from "../../shared/utils/notification.service";
import {Observable} from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class ApiService {

  constructor(private http: Http, private notificationService: NotificationService) {}

  public fetch(url): Observable<any>{
    return this.http.get(this.getBaseUrl() + url)
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error)
      })
  }

  public fetchExternal(url): Observable<any>{
    return this.http.get(url)
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error)
      })
  }

  public post(url, data): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.getBaseUrl() + url, JSON.stringify(data), options)
      .map(this.extractData)
      .catch(error => {
        return this.handleError(error);
      })
  }

  private getBaseUrl(){
    return location.protocol + '//' + location.hostname + (':8080') + '/'
  }

  private extractData(res:Response) {
    let body = res.json();
    if (body){
      return body.data || body
    } else {
      return {}
    }
  }

  private handleError(error:any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body.error || 'Service is temporarily unavailable';
    } else {
      let msgObj = JSON.parse(error._body);
      let errMsg = msgObj.error || 'Service is temporarily unavailable';
    }

    setTimeout(() => {
      this.notificationService.bigBox({
        title: error.statusText,
        content: errMsg,
        color: "#C46A69",
        icon: "fa fa-warning shake animated",
        number: "1",
        timeout: 5000
      });
    });
    return Observable.throw(error);
  }

}


