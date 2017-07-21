import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ZoneService } from '../../../core/services/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {
  zones: any[];
  projectId: number;

  constructor(private router: Router,
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
