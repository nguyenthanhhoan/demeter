import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../shared/user.service';
import { ApiService } from '../../../_core/api/api.service';
import { NotificationService } from '../../../_core/services/notification.service';

declare var window: any;
@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  settings = {
    actions: {
      add: false,
    },
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      is_confirm: {
        title: 'Email Confirm',
        type: 'boolean',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private ngZone: NgZone,
              private userService: UserService) {

  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getAll()
    .subscribe((users) => {
      this.source.load(users);
    })
  }

  delete(row) {
    const user = row.data;
    this.notificationService.confirm('Do you want to delete this user?')
    .subscribe(() => {
      this.userService.delete(user.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete user successfully!');
        this.loadUser();
      });
    });
  }

  edit(row) {
    const user = row.data;
    this.router.navigate([`/pages/user/${user.id}/edit`]);
  }
}
