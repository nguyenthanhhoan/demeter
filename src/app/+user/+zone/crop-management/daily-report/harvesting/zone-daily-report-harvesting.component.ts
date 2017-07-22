import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var moment: any;
@Component({
  selector: 'zone-daily-report-harvesting',
  templateUrl: './zone-daily-report-harvesting.component.html',
  styleUrls: ['./zone-daily-report-harvesting.component.css']
})
export class ZoneDailyReportHarvestingComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  zone_id: number;

  harvesting_reports = [{
    id: 1,
    name: 'Lettuce',
    type: 'Romain',
    quantity: 1000,
    cost: 200,
    note: 'Veggetables'
  }, {
    id: 2,
    name: 'Lettuce',
    type: 'BB',
    quantity: 1000,
    cost: 200
  }, {
    id: 3,
    name: 'Lettuce',
    type: 'CC',
    quantity: 1000,
    cost: 200
  }, {
    id: 4,
    name: 'Lettuce',
    type: 'DD',
    quantity: 1000,
    cost: 200
  }];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.oldZone = this.zone;
    }
  }

  harvestingFormResolve(harvesting) {
    if (harvesting.id) {
      let found = this.harvesting_reports.find((loop_harvesting) => {
        return loop_harvesting.id === harvesting.id;
      });
      Object.assign(found, harvesting);
    } else {
      let clone_irr = Object.assign({}, harvesting);
      clone_irr.id = (new Date()).getTime();
      this.harvesting_reports.push(clone_irr);
    }
  }

  remove(harvesting) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this Harvesting report?`
    }, () => {
      let index = this.harvesting_reports.indexOf(harvesting);
      this.harvesting_reports.splice(index, 1);
      this.notificationService.showMessage(`Remove Harvesting report successfully!`);
    });
  }
}
