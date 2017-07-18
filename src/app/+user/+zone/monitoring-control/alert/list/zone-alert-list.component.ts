import { Component, Input, OnInit } from '@angular/core';

declare var moment;

@Component({
  selector: 'zone-alert-list',
  templateUrl: './zone-alert-list.component.html',
  styleUrls: ['./zone-alert-list.component.scss']
})
export class ZoneAlertListComponent implements OnInit {

  alerts: any[] = [{
    time_display: moment('07/13/2017 00:00', 'MM/DD/YYYY HH:mm').fromNow(),
    alert_content: 'Temperature is 40°C',
    icon: 'dmt-thermometer'
  }, {
    time_display: moment('07/10/2017 00:00', 'MM/DD/YYYY HH:mm').fromNow(),
    alert_content: 'Humidity is 80%',
    icon: 'dmt-humidity'
  }, {
    time_display: moment('07/10/2017 00:00', 'MM/DD/YYYY HH:mm').fromNow(),
    alert_content: 'Pump is ON',
    icon: 'dmt-pump'
  }];

  collection: string[] = ['a', 'b', '34'];
  page: number = 1;

  public totalItems: number = 64;
  public currentPage: number = 4;
  public smallnumPages: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }
 
  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
