import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as Chartist from 'chartist';
import { LocalStorageService } from '../../../shared/utils/localstorage.service';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

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
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {
  chart: Chart;
  zones: any[];

  constructor(private localStorageService: LocalStorageService,
              private router: Router) { 
    this.chart = {
      type: 'Line',
      data: data['Line']
    };

    this.zones = [{
      image: "assets/img/cau-dat/strawberry.png",
      name: "Strawberry farm",
      percent: "40%",
      startDate: "15/03/2017",
      endDate: "01/03/2018",
      location: "Dalat, Vietnam",
      surface: "0.3 ha",
      worker: "3",
      id: "St01"
    }, {
      image: "assets/img/cau-dat/tomato.png",
      name: "Tomato",
      percent: "80%",
      startDate: "15/03/2017",
      endDate: "01/03/2018",
      location: "Dalat, Vietnam",
      surface: "0.5 ha",
      worker: "3",
      id: "St02"
    }]
  }

  ngOnInit() {
  }

}
