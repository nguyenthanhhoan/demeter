import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AppSettings } from '../../../../../app.settings';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { ZoneService } from '../../../../../core/services/zone.service';
import { CameraService } from '../../../../../core/services/camera.service';

declare var moment: any;
@Component({
  selector: 'zone-daily-report-overview',
  templateUrl: './zone-daily-report-overview.component.html',
  styleUrls: ['./zone-daily-report-overview.component.css']
})
export class ZoneDailyReportOverviewComponent implements OnInit, DoCheck {

  @Input()
  zone: any;
  oldZone: any = {};
  project_id: number;
  zone_id: number;

  irrigationType = AppSettings.irrigationType;

  irrigations = [{
    id: 1,
    time: moment('2016-04-05 05:00').format('hh:mm A'),
    event: 'watering',
    duration: 20,
    ec: 1.2,
    ph: 7,
    ferlitizer: 'Super',
    concentration: 5,
    amount: 0.3
  }, {
    id: 2,
    time: moment('2016-04-05 12:00').format('hh:mm A'),
    event: 'watering',
    duration: 15,
    ec: 1,
    ph: 6.5,
    ferlitizer: 'Kahach',
    concentration: 10,
    amount: 0.2
  }, {
    id: 3,
    time: moment('2016-04-05 17:00').format('hh:mm A'),
    event: 'watering_fertilizer',
    duration: 5,
    ec: 1,
    ph: 5,
    ferlitizer: 'Super',
    concentration: 8,
    amount: 0.1
  }];

  pest_diseases = [{
    id: 1,
    type: 'Disease',
    sub_type: 'Earwigs',
    situation: '10%',
    pesticides: 'Ababetter',
    concentration: 5,
    amount: 0.3
  }, {
    id: 2,
    type: 'Weeds',
    sub_type: 'Earwigs',
    situation: '20%',
    pesticides: 'Abagro',
    concentration: 10,
    amount: 0.2
  }];

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
  }];

  notes = [{
    title: 'Note 1',
    content: 'Appeared few days ago'
  }, {
    title: 'Note 2'
  }];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private cameraService: CameraService) {

    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.irrigations.forEach((irrigation) => {
      irrigation.event = this.irrigationType[irrigation.event];
    });
  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id !== this.zone.id) {
      this.oldZone = this.zone;
    }
  }

  irrigationFormResolve(irrigation) {
    if (irrigation.id) {
      let found = this.irrigations.find((loop_irrigation) => {
        return loop_irrigation.id === irrigation.id;
      });
      Object.assign(found, irrigation);
    } else {
      let clone_irr = Object.assign({}, irrigation);
      clone_irr.id = (new Date()).getTime();
      this.irrigations.push(clone_irr);
    }
  }

  pestDiseaseFormResolve(pest_disease) {
    if (pest_disease.id) {
      let found = this.pest_diseases.find((loop_pest_disease) => {
        return loop_pest_disease.id === pest_disease.id;
      });
      Object.assign(found, pest_disease);
    } else {
      let clone_irr = Object.assign({}, pest_disease);
      clone_irr.id = (new Date()).getTime();
      this.pest_diseases.push(clone_irr);
    }
  }

  remove(item, type) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this ${type}?`
    }, () => {
      let items = [];
      switch (type) {
        case 'Irrigation':
          items = this.irrigations;
          break;
        case 'Pests / Disease':
          items = this.pest_diseases;
          break;
        default:
          break;
      }
      let index = items.indexOf(item);
      items.splice(item, 1);
      this.notificationService.showMessage(`Remove ${type} successfully!`);
    });
  }
}
