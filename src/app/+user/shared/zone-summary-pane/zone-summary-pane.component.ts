import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ZoneService } from '../../../core/services/zone.service';

@Component({
  selector: 'app-zone-summary-pane',
  templateUrl: './zone-summary-pane.component.html',
  styleUrls: ['./zone-summary-pane.component.css']
})
export class ZoneSummaryPaneComponent implements OnInit {

  @Input()
  zone: any;

  @Input()
  isShowDetailButton: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService) { 
  }

  ngOnInit() {

    let id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];
    if (id) {
      this.zone = {
        percent: "80%"
      };
      this.zoneService.getOne(project_id, id).subscribe(data => {
        Object.assign(this.zone, data);
      });
    }
  }

}
