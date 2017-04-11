import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';

@Component({
  templateUrl: './zone-setting.component.html',
  styleUrls: ['./zone-setting.component.css']
})
export class ZoneSettingComponent implements OnInit {

  zone: any;
  project_id: number;

  public state: any = {
    tabs: {
      activeTab: 0
    }
  }

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
      console.log('zone detail not loaded!');
      this.zoneService.getOne(project_id, id).subscribe(data => {
        Object.assign(this.zone, data);
        console.log('zone detail loaded!');
      });
      
    } else {
      Object.assign(this.zone, {
        image: "assets/img/cau-dat/cau-dat-farm.png"
      });
    }
  }
}
