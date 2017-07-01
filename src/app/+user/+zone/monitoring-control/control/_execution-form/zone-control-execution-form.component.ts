import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { ProgramExecutionService } from '../../../../../core/services/program-execution.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var $: any;
@Component({
  selector: 'zone-control-execution-form',
  templateUrl: './zone-control-execution-form.component.html',
  styleUrls: ['./zone-control-execution-form.component.scss']
})
export class ZoneControlExecutionFormComponent implements OnInit {
  project_id: number;
  zone_id: number;

  @Input()
  program: any = {};

  @Input()
  type: string;

  input: any = {
    condition: 'AND',
    rules: [{
      id: 'time',
      operator: 'equal',
      value: '7:00 AM'
    }, {
      condition: 'OR',
      rules: [{
        id: 'temperature',
        operator: 'greater',
        value: 25
      }, {
        id: 'humidity',
        operator: 'less',
        value: 50
      }]
    }]
  };

  output: any = {
    condition: 'AND',
    rules: [{
      id: 'pumb',
      operator: 'equal',
      value: 1
    }, {
      id: 'fan',
      operator: 'equal',
      value: 1
    }]
  };

  filters: any[] = [{
    id: 'time',
    label: 'Time',
    type: 'string'
  }, {
    id: 'temperature',
    label: 'Temperature',
    type: 'integer'
  }, {
    id: 'humidity',
    label: 'Humidity',
    type: 'integer'
  }, {
    id: 'pumb',
    label: 'Pumb 1',
    type: 'integer'
  }, {
    id: 'fan',
    label: 'Fan 1',
    type: 'integer'
  }];

  @ViewChild('inputQueryBuilder') inputQueryBuilder: any;
  @ViewChild('outputQueryBuilder') outputQueryBuilder: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private programExecutionService: ProgramExecutionService,
              private notificationService: NotificationService) {
    this.zone_id = +this.route.snapshot.params['id'];
    this.project_id = +this.route.snapshot.params['project_id'];
  }

  ngOnInit() {
  }

  buildSubmitProgram(program) {
    let submitProgram = {
      id: program.id,
      name: program.name,
      input: JSON.stringify(this.inputQueryBuilder.getRules()),
      output: JSON.stringify(this.outputQueryBuilder.getRules()),
      zone_id: this.zone_id
    };
    return submitProgram;
  }

  validate() {
    return (this.inputQueryBuilder.validate() && this.outputQueryBuilder.validate());
  }

  create() {
    if (!this.validate()) {
      return;
    }
    let submitProgram = this.buildSubmitProgram(this.program);
    this.programExecutionService.post(this.zone_id, submitProgram)
    .subscribe(() => {
      this.notificationService.showMessage('Program Execution created successfully!');
      this.router
      .navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/control/executions`]);
    });
  }

  update() {
    if (!this.validate()) {
      return;
    }
    let submitProgram = this.buildSubmitProgram(this.program);
    this.programExecutionService.put(this.zone_id, submitProgram)
    .subscribe(() => {
      this.notificationService.showMessage('Program Execution updated successfully!');
      this.router
      .navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/control/executions`]);
    });
  }
}
