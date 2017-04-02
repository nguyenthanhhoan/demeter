import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from "@angular/router";

import { ProjectService } from '../../shared/services/project.service';
import { ApiService } from '../../../core/api/api.service';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private http: Http,
              private router: Router,
              private apiService: ApiService,
              // private projectService: ProjectService
              ) {

  }

  public REST_ROOT = 'https://jsonplaceholder.typicode.com';

  options = {
    dom: "Bfrtip",
    ajax: (data, callback, settings) => {
      this.apiService.fetch('admin/projects')
        .subscribe((data) => {
          console.log('data from rest endpoint', data);
          callback({
            aaData: data.slice(0, 100)
          })
        })
    },
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "location" },
      { data: "user.email" },
    ]
  };

  ngOnInit() {}


  private extractData(res: Response) {
    let body = res.json();
    if (body) {
      return body.data || body
    } else {
      return {}
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
