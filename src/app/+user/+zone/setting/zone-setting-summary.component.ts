import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ZoneService } from '../../../core/services/zone.service';

@Component({
  selector: 'zone-setting-summary',
  templateUrl: './zone-setting-summary.component.html',
  styleUrls: ['./zone-setting-summary.component.css']
})
export class ZoneSettingSummaryComponent implements OnInit {

  @Input()
  zone: any;
  project_id: number;

  setting: {} = {
    weatherForecastEnabled: false,
    zoneEnvironmentEnabled: false,
    inputs: [{
      no: 1,
      name: 'Temperature',
      input: 'B1 - Sensor 1'
    }, {
      no: 2,
      name: 'Humidity',
      input: 'B1 - Sensor 2'
    }, {
      no: 3,
      name: 'Light',
      input: 'B1 - Sensor 3'
    }]
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
  }
}
