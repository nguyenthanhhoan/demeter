import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';
import { ApiService } from '../../../core/api/api.service';
import { NotificationService } from '../../../shared/utils/notification.service';

declare var window: any;
@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  datatable: any;

  options = this.apiService.fetchTableData({
    url: 'admin/users',
    columns: [
      { data: 'id' },
      { data: 'email' },
      { data: 'name' },
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
  });

  constructor(private router: Router,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private ngZone: NgZone,
              private userService: UserService) {

  }

  ngOnInit() {}

  openDeleteConfirm(id) {
    this.notificationService.confirmBox({
      content: 'Do you want to delete this user?'
    }, () => {
      this.userService.delete(id)
      .subscribe(data => {
        this.datatable.ajax.reload();
        this.notificationService.showMessage('Delete user successfully!');
      });
    });
  }

  goToEdit(id) {
    this.ngZone.run(() => {
      this.router.navigate([`/admin/user/${id}/edit`]);
    });
  }

  setDatatableEle(datatable) {
    this.datatable = datatable;
  }

}
