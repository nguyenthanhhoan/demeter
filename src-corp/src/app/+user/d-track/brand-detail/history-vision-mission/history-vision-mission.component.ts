import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'history-vision-mission',
  templateUrl: './history-vision-mission.component.html',
  styleUrls: ['./history-vision-mission.component.scss']
})
export class HistoryVisionMissionComponent implements OnInit {

  @Input()
  brand: any;

  constructor() { }

  ngOnInit() {
  }

}
