import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from "@angular/router";

import { NotificationService } from '../../../shared/utils/notification.service';
import { ZoneService } from '../../shared/services/zone.service';
import { ApiService } from '../../../core/api/api.service';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var window: any;

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {

  datatable: any;

  constructor(private http: Http,
              private router: Router,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private zoneService: ZoneService
              ) {

  }

  options = this.apiService.fetchTableData({
    url: 'admin/zones', 
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "location" },
      { data: "project.name" },
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
      content: 'Do you want to delete this zone?'
    }, () => {
      this.zoneService.delete(id)
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
