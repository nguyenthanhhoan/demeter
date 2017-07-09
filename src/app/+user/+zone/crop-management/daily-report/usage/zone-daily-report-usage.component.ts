import { Component, OnInit, DoCheck, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { NotificationService } from '../../../../../shared/utils/notification.service';
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
    id: 1,
    worker_id: 'A01',
    worker_name: 'Nguyen Van A',
    from: moment('2016-04-05 12:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 5,
    cost: 20,
    note: 'Late'
  }, {
    id: 2,
    worker_id: 'B01',
    worker_name: 'Nguyen Van B',
    from: moment('2016-04-05 08:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 7,
    cost: 20,
    note: 'Fulltime'
  }];

  machinery_reports = [{
    id: 1,
    name: 'Truck',
    task: 'Logistics',
    from: moment('2016-04-05 12:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 5,
    cost: 20,
    note: 'CDF - Dalat'
  }, {
    id: 2,
    name: 'Truck',
    task: 'Logistics',
    from: moment('2016-04-05 12:00').format('hh:mm A'),
    to: moment('2016-04-05 17:00').format('hh:mm A'),
    total: 5,
    cost: 60,
    note: 'CDF - Dalat'
  }];

  fuel_reports = [{
    id: 1,
    name: 'Gas',
    type: 'MG-92',
    quantity: 10,
    cost: 60,
    note: 'Truck Used'
  }, {
    id: 1,
    name: 'Truck',
    type: 'MG-92',
    quantity: 5,
    cost: 60,
    note: 'Truck Used'
  }];

  fertilizer_reports = [{
    id: 1,
    name: 'Phosphate',
    type: 'P',
    quantity: 10,
    cost: 200,
    note: 'Veggetables'
  }, {
    id: 2,
    name: 'NPK',
    type: 'NPK',
    quantity: 10,
    cost: 200
  }];

  pesticide_reports = [{
    id: 1,
    name: 'Arrow',
    type: 'P',
    quantity: 10,
    cost: 200,
    note: 'Veggetables'
  }, {
    id: 2,
    name: 'Thuoc chuot',
    type: 'NPK',
    quantity: 10,
    cost: 200
  }];

  water_reports = [{
    id: 1,
    name: 'Water',
    type: '',
    quantity: 10,
    cost: 200,
    note: 'Veggetables'
  }, {
    id: 2,
    name: 'Recycled Water',
    type: '',
    quantity: 10,
    cost: 200
  }];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private zoneService: ZoneService,
              private cameraService: CameraService) {

  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (this.zone && this.zone.id && this.oldZone.id !== this.zone.id) {
      this.oldZone = this.zone;
    }
  }

  remove(item, type) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this ${type}?`
    }, () => {
      let items = [];
      switch (type) {
        case 'Work Hour':
          items = this.work_hour_reports;
          break;
        case 'Machinery':
          items = this.machinery_reports;
          break;
        case 'Fuel':
          items = this.fuel_reports;
          break;
        case 'Fertilizer':
          items = this.fertilizer_reports;
          break;
        case 'Pesticide':
          items = this.pesticide_reports;
          break;
        case 'Water Report':
          items = this.water_reports;
          break;
        default:
          break;
      }
      let index = items.indexOf(item);
      items.splice(index, 1);
      this.notificationService.showMessage(`Remove ${type} successfully!`);
    });
  }

  workHourFormResolve(work_hour) {
    if (work_hour.id) {
      let found = this.work_hour_reports.find((loop_work_hour) => {
        return loop_work_hour.id === work_hour.id;
      });
      Object.assign(found, work_hour);
    } else {
      let clone_irr = Object.assign({}, work_hour);
      clone_irr.id = (new Date()).getTime();
      this.work_hour_reports.push(clone_irr);
    }
  }

  machineryFormResolve(machinery) {
    if (machinery.id) {
      let found = this.machinery_reports.find((loop_machinery) => {
        return loop_machinery.id === machinery.id;
      });
      Object.assign(found, machinery);
    } else {
      let clone_irr = Object.assign({}, machinery);
      clone_irr.id = (new Date()).getTime();
      this.machinery_reports.push(clone_irr);
    }
  }

  fuelFormResolve(fuel) {
    if (fuel.id) {
      let found = this.fuel_reports.find((loop_fuel) => {
        return loop_fuel.id === fuel.id;
      });
      Object.assign(found, fuel);
    } else {
      let clone_irr = Object.assign({}, fuel);
      clone_irr.id = (new Date()).getTime();
      this.fuel_reports.push(clone_irr);
    }
  }

  fertilizerFormResolve(fertilizer) {
    if (fertilizer.id) {
      let found = this.fertilizer_reports.find((loop_fertilizer) => {
        return loop_fertilizer.id === fertilizer.id;
      });
      Object.assign(found, fertilizer);
    } else {
      let clone_irr = Object.assign({}, fertilizer);
      clone_irr.id = (new Date()).getTime();
      this.fertilizer_reports.push(clone_irr);
    }
  }

  pesticideFormResolve(pesticide) {
    if (pesticide.id) {
      let found = this.pesticide_reports.find((loop_pesticide) => {
        return loop_pesticide.id === pesticide.id;
      });
      Object.assign(found, pesticide);
    } else {
      let clone_irr = Object.assign({}, pesticide);
      clone_irr.id = (new Date()).getTime();
      this.pesticide_reports.push(clone_irr);
    }
  }

  waterFormResolve(water) {
    if (water.id) {
      let found = this.water_reports.find((loop_water) => {
        return loop_water.id === water.id;
      });
      Object.assign(found, water);
    } else {
      let clone_irr = Object.assign({}, water);
      clone_irr.id = (new Date()).getTime();
      this.water_reports.push(clone_irr);
    }
  }
}
