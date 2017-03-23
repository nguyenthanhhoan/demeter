import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';
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
  project_id: number;

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {
    this.chart = {
      type: 'Line',
      data: data['Line']
    };
  }

  ngOnInit() {
    this.project_id = +this.route.snapshot.params['id'];

    let user = this.localStorageService.retrieve('user');
    this.zoneService.getList(user.id, this.project_id).subscribe(data => {
      data.forEach((zone) => {
        zone.percent = "80%";
      })
      this.zones = data;
    });
  }

}
