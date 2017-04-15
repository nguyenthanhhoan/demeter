import { Component, Input } from '@angular/core';

import { AppSettings } from '../../../../../app.settings';
declare var moment: any;
@Component({
  selector: 'okr-table',
  templateUrl: './okr-table.component.html',
  styleUrls: ['./okr-table.component.css']
})
export class OKRTableComponent {

  @Input()
  objectives: any[]

  constructor() {
  }
}
