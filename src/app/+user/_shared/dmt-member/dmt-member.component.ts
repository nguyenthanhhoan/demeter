import { ISubscription } from 'rxjs/Subscription';
import { SubscribableOrPromise } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';

import { InvitationService } from '../../../core/services/invitation.service';
import { ProjectService } from '../../../core/services/project.service';
import { ZoneService } from '../../../core/services/zone.service';
import { NotificationService } from '../../../shared/utils/notification.service';
import { AppSettings } from '../../../app.settings';

@Component({
  selector: 'dmt-member',
  templateUrl: './dmt-member.component.html',
  styleUrls: ['./dmt-member.component.scss']
})
export class MemberComponent implements OnInit {

  @Input()
  type: string;
  projectId: number;
  zoneId: number;
  admins: any[];
  users: any[];
  invitations: any[];
  emailPattern: RegExp;

  newMember: any;

  constructor(private store: Store<any>,
              private invitationService: InvitationService,
              private projectService: ProjectService,
              private zoneService: ZoneService,
              private notification: NotificationService) {
    this.emailPattern = AppSettings.validation.email;
  }

  ngOnInit() {

    if (this.type === 'project') {
      this.initForProject();
      this.newMember = {
        email: '',
        role: 'project_user'
      };
    } else {
      this.initForZone();
      this.newMember = {
        email: '',
        role: 'zone_user'
      };
    }
  }

  initForProject() {
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

  initForZone() {
    this.store.select('zone')
    .takeWhile(() => {
      return (typeof this.zoneId === 'undefined');
    })
    .subscribe((zoneModel: any) => {
      if (zoneModel.zoneId && zoneModel.projectId) {
        this.zoneId = zoneModel.zoneId;
        this.loadMember();
      }
    });
  }

  loadMember() {
    let observable: Observable<any>;
    if (this.type === 'project') {
      observable = this.projectService.listMember(this.projectId);
    } else {
      observable = this.zoneService.listMember(this.zoneId);
    }
    observable.subscribe((res: any) => {
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
    let observable: Observable<any>;
    if (this.type === 'project') {
      observable = this.projectService.addNewMember(this.projectId, member);
    } else {
      observable = this.zoneService.addNewMember(this.zoneId, member);
    }
    observable.subscribe((res: any) => {
      if (res && res.message) {
        this.notification.showMessage(res.message);
        this.loadMember();
        member.email = '';
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
      let observable: Observable<any>;
      if (this.type === 'project') {
        observable = this.projectService.removeMember(this.projectId, {
          email: user.email
        });
      } else {
        observable = this.zoneService.removeMember(this.zoneId, {
          email: user.email
        });
      }
      observable.subscribe(() => {
        this.loadMember();
      });
    });
  }
}
