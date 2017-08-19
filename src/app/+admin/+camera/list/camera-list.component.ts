import { Component, NgZone, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from "@angular/router";

import { NotificationService } from '../../../shared/utils/notification.service';
import { CameraService } from '../../shared/services/camera.service';
import { ApiService } from '../../../core/api/api.service';

import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var window: any;

@Component({
  selector: 'camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.css']
})
export class CameraListComponent implements OnInit {

  datatable: any;

  options = this.apiService.fetchTableData({
    url: 'admin/cameras',
    columns: [
      { data: 'id' },
      { data: 'camera_no' },
      { data: 'camera_name' },
      { data: 'api' },
      { data: 'id' }
    ],
    columnDefs: [{
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
  })

  constructor(private http: Http,
              private router: Router,
              private ngZone: NgZone,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private cameraService: CameraService
              ) {

  }

  openDeleteConfirm(id) {
    this.notificationService.confirmBox({
      content: 'Do you want to delete this camera?'
    }, () => {
      this.cameraService.delete(id)
      .subscribe(data => {
        this.datatable.ajax.reload();
      });
    });
  }

  goToEdit(id) {
    this.ngZone.run(() => {
      this.router.navigate([`/admin/camera/${id}`]);
    });
  }

  setDatatableEle(datatable) {
    this.datatable = datatable;
  }

  ngOnInit() {}

}
