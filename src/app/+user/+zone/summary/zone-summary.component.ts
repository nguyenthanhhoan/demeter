import { Component, OnInit, AfterViewInit, Input, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';
import { SensorDataChartComponent } from '../../shared/sensor-data-chart/sensor-data-chart.component';

@Component({
  templateUrl: './zone-summary.component.html',
  styleUrls: ['./zone-summary.component.css']
})
export class ZoneSummaryComponent implements OnInit, AfterViewInit {

  @ViewChildren('environmentChart')
  private environmentChart;

  zone: any = {}
  project: {} = {}
  setting: {} = {}
  project_id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];
    if (id) {
      this.zone = {
        image: "assets/img/cau-dat/cau-dat-farm.png"
      };
      this.zoneService.getOne(project_id, id).subscribe(data => {
        Object.assign(this.zone, data);
        Object.assign(this.project, this.zone.project);
        Object.assign(this.setting, this.zone.setting);
      });
    } else {
      Object.assign(this.zone, {
        image: "assets/img/cau-dat/cau-dat-farm.png"
      });
    }
  }

  ngAfterViewInit() {
    this.environmentChart.changes.subscribe(item => {
      if(this.environmentChart.toArray().length) {
        this.environmentChart.toArray().forEach(element => {
          element.initData();
        });
      }
    })
  }

}
