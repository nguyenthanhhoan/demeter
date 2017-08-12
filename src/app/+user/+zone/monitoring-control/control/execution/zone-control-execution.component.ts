import { ISubscription } from 'rxjs/Subscription';
import {
  Component, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';

import { ProgramExecutionService } from '../../../../../core/services/program-execution.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

@Component({
  selector: 'zone-control-execution',
  templateUrl: './zone-control-execution.component.html',
  styleUrls: ['./zone-control-execution.component.scss']
})
export class ZoneControlExecutionComponent {

  zoneId: number;
  programs: any[];
  canEdit: boolean = false;
  private zoneSubscription: ISubscription;
  private userRole: string;

  constructor(private store: Store<any>,
              private programExecutionService: ProgramExecutionService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zoneId = zoneModel.zoneId;
        this.userRole = zoneModel.zone.current_user_role;
        this.checkPermission();
        this.loadPrograms();
      }
    });
  }

  checkPermission() {
    if (this.userRole === 'user' || this.userRole === 'guest') {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
  }

  loadPrograms() {
    this.programExecutionService.list(this.zoneId)
    .subscribe((programs) => {
      this.programs = programs;
    });
  }

  remove(program) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this execution?`
    }, () => {
      this.notificationService.showMessage(`Remove execution successfully!`);
      this.programExecutionService.delete(this.zoneId, program.id)
      .subscribe((fields) => {
        this.loadPrograms();
      });
    });
  }


  changeValue($event, program) {
    $event.preventDefault();

    let newValue = true;
    if (program.is_active === true) {
      newValue = false;
    }
    program.isRunning = true;
    this.programExecutionService.put(this.zoneId, {
      id: program.id,
      is_active: newValue
    })
    .subscribe(() => {
      this.notificationService.showMessage('Execution active successfully!');
      program.isRunning = false;
      program.is_active = newValue;
    }, () => {
      this.notificationService.showErrorMessage({
        content: 'Cannot active execution!'
      });
      program.isRunning = false;
    });
  }
}
