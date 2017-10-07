import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../shared/utils/notification.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user = {};
  mode: string;
  user_id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.user_id = +this.route.snapshot.params['user_id'];
    if (this.user_id) {
      this.mode = 'edit';
      this.userService.getOne(this.user_id)
        .subscribe(data => {
          Object.assign(this.user, data);
        });
    } else {
      this.mode = 'new';
    }
  }

  saveOrUpdate() {
    let submitUser = this.user;
    if (this.mode === 'edit') {
      this.userService.put(submitUser).subscribe(data => {
        this.notificationService.showMessage('User updated successfully!');
        this.router.navigate([`/admin/user`]);
      });
    } else {
      this.userService.post(submitUser).subscribe(data => {
        this.notificationService.showMessage('User created successfully!');
        this.router.navigate([`/admin/user`]);
      });
    }
  }

  openChangePassword() {
    alert('To be implemented!');
  }
}
