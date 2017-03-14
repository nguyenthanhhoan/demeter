import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as Chartist from 'chartist';
import { LocalStorageService } from '../../shared/utils/localstorage.service';

import {
  ChartType,
  ChartEvent
} from '../../shared/graphs/chartist/chartist.component';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

var data = {
  "Line": {
    "labels": [
      "10/03",
      "11/03",
      "12/03",
      "13/03",
      "14/03",
      "14/03",
      "14/03"
    ],
    "series": [
      [
        12,
        9,
        7,
        8,
        5,
        8,
        9
      ],
      [
        2,
        1,
        3.5,
        7,
        3,
        4,
        5
      ]
    ]
  }
};

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  chart: Chart;

  constructor(private localStorageService: LocalStorageService,
              private router: Router) { 
    this.chart = {
      type: 'Line',
      data: data['Line']
    };
  }

  ngOnInit() {
  }

  logout(){
    let user = this.localStorageService.remove('user');
    this.router.navigate(['/auth/login']);
  }

}
