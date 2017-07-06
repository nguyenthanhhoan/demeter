import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { DeviceFieldService } from '../../../../../core/services/device-field-service';
import { ProgramExecutionService } from '../../../../../core/services/program-execution.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var $: any;
@Component({
  selector: 'zone-control-execution-form',
  templateUrl: './zone-control-execution-form.component.html',
  styleUrls: ['./zone-control-execution-form.component.scss']
})
export class ZoneControlExecutionFormComponent implements OnInit, OnChanges {
  project_id: number;
  zone_id: number;

  @Input()
  program: any = {
    schedule: '0 0 * * *'
  };

  oldProgram: any = {};

  @Input()
  type: string;

  // For demo purpose. To be removed.
  input: any = {
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
  };

  // For demo purpose. To be removed.
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

  filters: any[];

  filtersLoaded: boolean = false;

  @ViewChild('inputQueryBuilder') inputQueryBuilder: any;
  @ViewChild('outputQueryBuilder') outputQueryBuilder: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deviceFieldService: DeviceFieldService,
              private programExecutionService: ProgramExecutionService,
              private notificationService: NotificationService) {
    this.zone_id = +this.route.snapshot.params['id'];
    this.project_id = +this.route.snapshot.params['project_id'];
  }

  ngOnInit() {
    this.fetchListDevice();
    this.initCron();
  }

  ngOnChanges() {
    if (this.program && this.program.id && this.program.id !== this.oldProgram.id) {
      // Receive updated program, should init component
      this.updateCronValue();
    }
  }

  initCron() {
    const { schedule } = this.program;
    $('.cron').cron({
      initial: schedule
    });
  }

  updateCronValue() {
    const { schedule } = this.program;
    $('.cron').cron('value', schedule);
  }

  fetchListDevice() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('zone_id', this.zone_id.toString());
    params.set('link_type', 'control');
    this.deviceFieldService.getListAssigned({
      search: params
    }).subscribe((fields) => {
      this.initDevices(fields);
    });
  }

  initDevices(fields) {
    this.filters = [];
    fields.map((field) => {
      this.filters.push({
        id: field.name,
        label: field.name_display,
        type: field.value_data_type
      });
    });
    this.filtersLoaded = true;
  }

  buildSubmitProgram(program) {
    let submitProgram = {
      id: program.id,
      name: program.name,
      input: JSON.stringify(this.inputQueryBuilder.getRules()),
      output: JSON.stringify(this.outputQueryBuilder.getRules()),
      zone_id: this.zone_id,
      schedule: $('.cron').cron('value')
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
