import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { InvitationService } from './invitation.service';
import { CoreService } from '../../core/services/core.service';
import { NotificationService } from '../../shared/utils/notification.service';

@Component({
  selector: 'dmt-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  user: any = {};
  token: string;
  constructor(private invitationService: InvitationService,
              private coreService: CoreService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.invitationService.getByToken(this.token)
    .subscribe(res => {
      this.user = res;
    });
  }

  register() {
    this.coreService.create_user_from_invitation({
      user: this.user,
      token: this.token
    })
    .subscribe(() => {
      this.notificationService.showMessage('Account created successfully!');
      this.notificationService.showMessage('Please login to continue!');
      this.router.navigate(['auth/login']);
    });
  }

}
