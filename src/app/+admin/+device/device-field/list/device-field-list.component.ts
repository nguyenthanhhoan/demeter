import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { ProjectService } from '../../../shared/services/project.service';
import { ApiService } from '../../../../core/api/api.service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var window: any;

@Component({
  selector: 'device-field-list',
  templateUrl: './device-field-list.component.html'
})
export class DeviceFieldListComponent implements OnInit {

  datatable: any;
  device_id: number;
  options: any;

  constructor(private http: Http,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private projectService: ProjectService
              ) {

  }

  openDeleteConfirm(id) {
    this.notificationService.confirmBox({
      content: 'Do you want to delete this field?'
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

  ngOnInit() {
    this.device_id = +this.route.snapshot.params['device_id'];
    this.options = this.apiService.fetchTableData({
      url: `admin/devices/${this.device_id}/device_fields`,
      columns: [
        { data: 'id' },
        { data: 'field_id' },
        { data: 'name' },
        { data: 'name_display' },
        { data: 'description' },
        { data: 'value' },
        { data: 'interval' },
        { data: 'last_updated' },
        { data: 'status' },
        { data: 'id' }
      ],
      columnDefs: [{
        targets: -1,
        data: null,
        render: ( data) => {
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
  }

  goToEdit(id) {
    this.router.navigate([`/admin/device/${this.device_id}/field/${id}/edit`]);
  }

}
