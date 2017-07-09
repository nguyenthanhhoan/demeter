import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

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
  projectId: number;
  zoneId: number;

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

  outputOpts = {
    allow_groups: false,
    conditions: ['AND'],
    operators: ['equal']
  };

  filters: any[];

  filtersLoaded: boolean = false;

  @ViewChild('inputQueryBuilder') inputQueryBuilder: any;
  @ViewChild('outputQueryBuilder') outputQueryBuilder: any;

  constructor(private store: Store<any>,
              private route: ActivatedRoute,
              private router: Router,
              private deviceFieldService: DeviceFieldService,
              private programExecutionService: ProgramExecutionService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.store.select('zone')
    .takeWhile((zoneModel: any) => {
      return (typeof this.zoneId === 'undefined');
    })
    .subscribe((zoneModel) => {
      if (zoneModel.zoneId) {
        this.zoneId = zoneModel.zoneId;
        this.projectId = zoneModel.projectId;

        // TODO: Should check if stored input/output match with list device or not
        this.fetchListDevice();
        this.initCron();
      }
    });
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
    params.set('zone_id', this.zoneId.toString());
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

      if (field.value_data_type === 'integer' || field.value_data_type === 'float') {
        const type = field.value_data_type === 'integer' ? 'integer' : 'double';
        this.filters.push({
          id: field.field_id,
          label: field.name_display,
          type: type
        });
      } else {
        console.log('Only support integer or float!!!. Please check field: ', field);
      }
    });
    this.filtersLoaded = true;
  }

  buildSubmitProgram(program) {
    let submitProgram = {
      id: program.id,
      name: program.name,
      input: JSON.stringify(this.inputQueryBuilder.getRules()),
      output: JSON.stringify(this.outputQueryBuilder.getRules()),
      zone_id: this.zoneId,
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
    this.programExecutionService.post(this.zoneId, submitProgram)
    .subscribe(() => {
      this.notificationService.showMessage('Program Execution created successfully!');
      this.router
      .navigate([`/user/project/${this.projectId}/zone/${this.zoneId}/control/executions`]);
    });
  }

  update() {
    if (!this.validate()) {
      return;
    }
    let submitProgram = this.buildSubmitProgram(this.program);
    this.programExecutionService.put(this.zoneId, submitProgram)
    .subscribe(() => {
      this.notificationService.showMessage('Program Execution updated successfully!');
      this.router
      .navigate([`/user/project/${this.projectId}/zone/${this.zoneId}/control/executions`]);
    });
  }
}
