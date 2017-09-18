import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'control-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input()
  device: any = {};
  events: any = [{

  }, {

  }];

  ngOnInit() {
  }

}
