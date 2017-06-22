import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';

@Component({
  templateUrl: './zone-setting.component.html',
  styleUrls: ['./zone-setting.component.css']
})
export class ZoneSettingComponent implements OnInit {

  zone: any = {};
  project_id: number;
  zone_id: number;

  public state: any = {
    tabs: {
      activeTab: 0
    }
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {

  }

  ngOnInit() {
    this.zone_id = +this.route.snapshot.params['id'];
    this.project_id = +this.route.snapshot.params['project_id'];
    this.loadZone();
  }

  loadZone() {
    this.zoneService.getOne(this.project_id, this.zone_id).subscribe(data => {
      Object.assign(this.zone, data);
      console.log('zone detail loaded!');
    });
  }
}
