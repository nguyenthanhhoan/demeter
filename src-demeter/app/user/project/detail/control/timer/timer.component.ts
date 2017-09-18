import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'control-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input()
  device: any = {};
  schedules: any = [{

  }, {

  }];

  ngOnInit() {
  }

}
