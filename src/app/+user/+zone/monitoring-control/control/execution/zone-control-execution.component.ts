import {
  Component, OnInit
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { ProgramExecutionService } from '../../../../../core/services/program-execution.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

@Component({
  selector: 'zone-control-execution',
  templateUrl: './zone-control-execution.component.html',
  styleUrls: ['./zone-control-execution.component.scss']
})
export class ZoneControlExecutionComponent {

  zone_id: number;
  programs: any[];

  constructor(private route: ActivatedRoute,
              private programExecutionService: ProgramExecutionService,
              private notificationService: NotificationService) {
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programExecutionService.list(this.zone_id)
    .subscribe((programs) => {
      this.programs = programs;
    });
  }

  remove(program) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this execution?`
    }, () => {
      this.notificationService.showMessage(`Remove execution successfully!`);
      this.programExecutionService.delete(this.zone_id, program.id)
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
    this.programExecutionService.put(this.zone_id, {
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
