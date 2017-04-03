import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from "@angular/router";

import { NotificationService } from '../../../shared/utils/notification.service';
import { ProjectService } from '../../shared/services/project.service';
import { ApiService } from '../../../core/api/api.service';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var window: any;

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  datatable: any;

  constructor(private http: Http,
              private router: Router,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private projectService: ProjectService
              ) {

  }

  options = this.apiService.fetchTableData({
    url: 'admin/projects', 
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "location" },
      { data: "user.email" },
      { data: "id" }
    ],
    columnDefs: [{
      targets: -1,
      data: null,
      render: ( data, type, row, meta ) => {
        var id = data;
        window.openConfirmModalFn = this.openDeleteConfirm.bind(this);
        return '<button style="margin-right:12.5px;" type="button"' +
          'class="remove-sm btn-red btn btn-default" ' +
          'onclick="openConfirmModalFn(' + id + ')">Remove</button>';
      }
    }]
  })

  openDeleteConfirm(id) {
    this.notificationService.confirmBox({
      content: 'Do you want to delete this project?'
    }, () => {
      this.projectService.delete(id)
      .subscribe(data => {
        this.datatable.ajax.reload();
      });
    });
  }

  setDatatableEle(datatable) {
    this.datatable = datatable;
  }

  ngOnInit() {}

}
