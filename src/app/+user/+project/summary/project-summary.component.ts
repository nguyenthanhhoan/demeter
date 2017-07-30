import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../../../core/services/zone.service';

@Component({
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {

  zones: any[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) {
  }

  ngOnInit() {
    let projectId = this.route.snapshot.params['id'];
    this.zoneService.getList(projectId).subscribe(data => {
      this.zones = data;
    });
  }
}
