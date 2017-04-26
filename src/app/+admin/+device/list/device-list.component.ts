import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { NotificationService } from '../../../shared/utils/notification.service';
import { DeviceService } from '../../shared/services/device.service';
import { ApiService } from '../../../core/api/api.service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var window: any;

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  datatable: any;

  options = this.apiService.fetchTableData({
    url: 'admin/devices',
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'device_type' },
      { data: 'api' },
      { data: 'created_by.email' },
      { data: 'id' }
    ],
    columnDefs: [{
      targets: 1,
      data: null,
      render: ( data, type, row, meta ) => {
        window.goToListField = this.goToListField.bind(this);
        return `<a onclick="goToListField(${row.id})">${data}</a>`;
      }
    }, {
      targets: -1,
      data: null,
      render: ( data, type, row, meta ) => {
        let id = data;
        window.openConfirmModalFn = this.openDeleteConfirm.bind(this);
        window.goToEdit = this.goToEdit.bind(this);
        return '<button style="margin-right:12.5px;" type="button"' +
          'class="btn btn-default" ' +
          'onclick="openConfirmModalFn(' + id + ')">Remove</button>' +
          '<button style="margin-right:12.5px;" type="button"' +
          'class="btn btn-info" ' +
          'onclick="goToEdit(' + id + ')">Edit</button>';
      }
    }]
  });

  constructor(private http: Http,
              private router: Router,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private deviceService: DeviceService
              ) {

  }

  openDeleteConfirm(id) {
    this.notificationService.confirmBox({
      content: 'Do you want to delete this device?'
    }, () => {
      this.deviceService.delete(id)
      .subscribe(data => {
        this.datatable.ajax.reload();
      });
    });
  }

  goToEdit(id) {
    this.router.navigate([`/admin/device/${id}/edit`]);
  }

  goToListField(id) {
    this.router.navigate([`/admin/device/${id}/field`]);
  }

  setDatatableEle(datatable) {
    this.datatable = datatable;
  }

  ngOnInit() {}

}
