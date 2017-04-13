import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ModalDirective } from "ng2-bootstrap";

import { NotificationService } from "../../../../shared/utils/notification.service";
import { ZoneService } from '../../../../core/services/zone.service';
import { CameraService } from '../../../../core/services/camera.service';

declare var moment: any;
@Component({
  selector: 'zone-report-overview',
  templateUrl: './zone-report-overview.component.html',
  styleUrls: ['./zone-report-overview.component.css']
})
export class ZoneReportOverviewComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  project_id: number;
  zone_id: number;

  irrigations = [{
    time: moment('2016-04-05 05:00').format('hh:mm A'),
    situation: 1,
    m: 20,
    water_ec: 1.2,
    water_ph: 7,
    ferlitizer: 'Super',
    concentration: 5,
    amount: 0.3
  }, {
    time: moment('2016-04-05 12:00').format('hh:mm A'),
    situation: 2,
    m: 15,
    water_ec: 1,
    water_ph: 6.5,
    ferlitizer: 'Kahach',
    concentration: 10,
    amount: 0.2
  }, {
    time: moment('2016-04-05 17:00').format('hh:mm A'),
    situation: 1,
    m: 5,
    water_ec: 1,
    water_ph: 5,
    ferlitizer: 'Super',
    concentration: 8,
    amount: 0.1
  }]

  pest_diseases = [{
    type: 'Disease',
    sub_type: 'Earwigs',
    situation: '10%',
    pesticides: 'Ababetter',
    concentration: 5,
    amount: 0.3
  }, {
    type: 'Weeds',
    sub_type: 'Earwigs',
    situation: '20%',
    pesticides: 'Abagro',
    concentration: 10,
    amount: 0.2
  }]

  photo_reports = [{
    title: 'Growing Images',
    images: [{
      src: 'assets/img/demo/s1.jpg',
      title: 'Date 1'
    }, {
      src: 'assets/img/demo/s2.jpg',
      title: 'Date 1'
    }, {
      src: 'assets/img/demo/s3.jpg',
      title: 'Date 1'
    }]
  }, {
    title: 'Leaves Images',
    images: [{
      src: 'assets/img/demo/s1.jpg',
      title: 'Date 1'
    }, {
      src: 'assets/img/demo/s2.jpg',
      title: 'Date 1'
    }, {
      src: 'assets/img/demo/s3.jpg',
      title: 'Date 1'
    }]
  }, {
    title: 'Height Images',
    images: [{
      src: 'assets/img/demo/s1.jpg',
      title: 'Date 1'
    }, {
      src: 'assets/img/demo/s2.jpg',
      title: 'Date 1'
    }, {
      src: 'assets/img/demo/s3.jpg',
      title: 'Date 1'
    }]
  }]

  notes = [{
    title: 'Note 1',
    content: 'Appeared few days ago'
  }, {
    title: 'Note 2'
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
