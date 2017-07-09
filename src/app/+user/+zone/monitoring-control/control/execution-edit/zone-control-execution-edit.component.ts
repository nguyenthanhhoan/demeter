import { Component, OnInit } from '@angular/core';
import { queryDef } from '@angular/core/src/view/query';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProgramExecutionService } from '../../../../../core/services/program-execution.service';

@Component({
  selector: 'zone-control-execution-edit',
  templateUrl: './zone-control-execution-edit.component.html'
})
export class ZoneControlExecutionEditComponent implements OnInit {

  programId: number;
  zoneId: number;
  program: any = {};

  constructor(private store: Store<any>,
              private programExecutionService: ProgramExecutionService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.programId = this.route.snapshot.params['program_id'];
    this.store.select('zone')
    .takeWhile((zoneModel: any) => {
      return (!this.zoneId);
    })
    .subscribe((zoneModel) => {
      if (zoneModel.zoneId) {
        this.zoneId = zoneModel.zoneId;
        this.loadProgram();
      }
    });
  }

  loadProgram() {
    this.programExecutionService.getOne(this.zoneId, this.programId)
    .subscribe((program: any) => {
      this.program = program;
    });
  }
}
