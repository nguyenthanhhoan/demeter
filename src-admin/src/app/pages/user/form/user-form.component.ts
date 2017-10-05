import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { NotificationService } from '../../../_core/services/notification.service';
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
      this.mode = 'Edit';
      this.userService.getOne(this.user_id)
        .subscribe(data => {
          Object.assign(this.user, data);
        });
    } else {
      this.mode = 'Create';
    }
  }

  saveOrUpdate() {
    const submitUser = this.user;
    if (this.mode === 'Edit') {
      this.userService.put(submitUser).subscribe(data => {
        this.notificationService.showMessage('User updated successfully!');
        this.router.navigate([`/pages/user`]);
      });
    } else {
      this.userService.post(submitUser).subscribe(data => {
        this.notificationService.showMessage('User created successfully!');
        this.router.navigate([`/pages/user`]);
      });
    }
  }

  openChangePassword() {
    alert('To be implemented!');
  }
}
