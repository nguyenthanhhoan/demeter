import { Component, OnInit } from '@angular/core';
import { queryDef } from '@angular/core/src/view/query';
import { ActivatedRoute } from '@angular/router';

import { ProgramExecutionService } from '../../../../../core/services/program-execution.service';

@Component({
  selector: 'zone-control-execution-edit',
  templateUrl: './zone-control-execution-edit.component.html'
})
export class ZoneControlExecutionEditComponent implements OnInit {

  program_id: number;
  zone_id: number;
  program: any = {};

  constructor(private programExecutionService: ProgramExecutionService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.program_id = +this.route.snapshot.params['program_id'];
    this.zone_id = +this.route.snapshot.params['id'];

    this.programExecutionService.getOne(this.zone_id, this.program_id)
    .subscribe((program: any) => {
      this.program = program;
    });
  }
}
