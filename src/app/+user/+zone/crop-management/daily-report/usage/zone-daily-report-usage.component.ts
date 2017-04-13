import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ModalDirective } from "ng2-bootstrap";

import { NotificationService } from "../../../../../shared/utils/notification.service";
import { ZoneService } from '../../../../../core/services/zone.service';
import { CameraService } from '../../../../../core/services/camera.service';

declare var moment: any;
@Component({
  selector: 'zone-daily-report-usage',
  templateUrl: './zone-daily-report-usage.component.html',
  styleUrls: ['./zone-daily-report-usage.component.css']
})
export class ZoneDailyReportUsageComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  project_id: number;
  zone_id: number;
  

  work_hour_reports = [{
    worker_id: 'A01',
    name: 'Nguyen Van A',
    from: moment('2016-04-05 12:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 5,
    cost: 20,
    note: 'Late'
  }, {
    worker_id: 'B01',
    name: 'Nguyen Van B',
    from: moment('2016-04-05 08:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 7,
    cost: 20,
    note: 'Fulltime'
  }]

  machinery_reports = [{
    name: 'Truck',
    task: 'Logistics',
    from: moment('2016-04-05 12:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 5,
    cost: 20,
    note: 'CDF - Dalat'
  }, {
    name: 'Truck',
    task: 'Logistics',
    from: moment('2016-04-05 12:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 5,
    cost: 60,
    note: 'CDF - Dalat'
  }]

  fuel_reports = [{
    name: 'Gas',
    type: 'MG-92',
    quantity: 10,
    cost: 60,
    note: 'Truck Used'
  }, {
    name: 'Truck',
    type: 'MG-92',
    quantity: 5,
    cost: 60,
    note: 'Truck Used'
  }]

  fertilizer_reports = [{
    name: 'Phosphate',
    type: 'P',
    quantity: 10,
    cost: 200,
    note: 'Veggetables'
  }, {
    name: 'NPK',
    type: 'NPK',
    quantity: 10,
    cost: 200
  }]

  pesticide_reports = [{
    name: 'Arrow',
    type: 'P',
    quantity: 10,
    cost: 200,
    note: 'Veggetables'
  }, {
    name: 'Thuoc chuot',
    type: 'NPK',
    quantity: 10,
    cost: 200
  }]

  water_reports = [{
    name: 'Water',
    type: '',
    quantity: 10,
    cost: 200,
    note: 'Veggetables'
  }, {
    name: 'Recycled Water',
    type: '',
    quantity: 10,
    cost: 200
  }]

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private cameraService: CameraService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id != this.zone.id) {
      this.oldZone = this.zone;
    }
  }
}
