import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';

import { ZoneService } from '../../../core/services/zone.service';
import { LocalStorageService } from '../../../shared/utils/localstorage.service';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {
  zones: any[];
  projectId: number;

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {
  }

  ngOnInit() {
    this.projectId = +this.route.snapshot.params['id'];

    this.zoneService.getList(this.projectId).subscribe(data => {
      this.zones = data;
    });
  }

}
