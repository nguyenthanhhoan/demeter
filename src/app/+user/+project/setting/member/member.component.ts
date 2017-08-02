import { AppSettings } from '../../../../app.settings';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { InvitationService } from '../../../../core/services/invitation.service';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'project-setting-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  projectId: number;

  admins: any[];
  users: any[];
  invitations: any[];
  emailPattern: RegExp;

  newMember: any = {
    email: '',
    role: 'project_user'
  };

  constructor(private store: Store<any>,
              private invitationService: InvitationService,
              private projectService: ProjectService,
              private notification: NotificationService) {
    this.emailPattern = AppSettings.validation.email;
  }

  ngOnInit() {
    this.store.select('project')
    .takeWhile(() => {
      return (typeof this.projectId === 'undefined');
    })
    .subscribe((projectModel: any) => {
      if (projectModel.project && projectModel.project.id) {
        this.projectId = projectModel.project.id;
        this.loadMember();
      }
    });
  }

  loadMember() {
    this.projectService.listMember(this.projectId)
    .subscribe((res: any) => {
      let {admins} = res.members;
      this.admins = admins;
      let {users} = res.members;
      this.users = users;
      let {invitations} = res;
      this.invitations = invitations;
    });
  }

  addNewMember(member) {
    if (!this.emailPattern.test(member.email)) {
      return;
    }
    member.email = member.email.trim();
    this.projectService.addNewMember(this.projectId, member).subscribe((res: any) => {
      if (res && res.message) {
        this.notification.showMessage(res.message);
        this.loadMember();
      }
    });
  }

  removeInvitation(invitation) {
    this.notification.confirmBox({
      content: `Do you want to remove this invitation?`
    }, () => {
      this.invitationService.delete(invitation.id)
      .subscribe(() => {
        this.notification.showMessage('Invitation removed successfully!');
        this.loadMember();
      });
    });
  }

  removeUser(user) {
    this.notification.confirmBox({
      content: `Do you want to remove this user?`
    }, () => {
      this.projectService.removeMember(this.projectId, {
        email: user.email
      })
      .subscribe(() => {
        this.loadMember();
      });
    });
  }
}
