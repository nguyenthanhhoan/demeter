import { Observable } from 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';
import { ProjectAlertService } from '../../../../core/api/services/project-alert.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  project: any = {};
  hours: any = [];
  minutes: any = [];
  interval: any = {
    hour: 0,
    minute: 1
  };
  alert: any = {
    interval: 1,
    rules: []
  };
  devices: any = [];
  @ViewChild('alertRuleModal') public alertRuleModal: any;
  private package_id;
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>,
              private deviceService: DeviceService,
              private projectAlertService: ProjectAlertService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project = app.project;
        this.package_id = app.project.package.hash_id;
        this.loadData();
      }
    });
    for (let i = 0; i <= 24; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i <= 60; i++) {
      this.minutes.push(i);
    }
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  loadData() {
    this.loadDevice()
    .flatMap(() => {
      return this.loadAlert();
    })
    .subscribe((alert) => {
      this.alert = alert;
      this.buildInitAlertData();
    });
  }

  loadDevice(): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('package_id', this.package_id);
    return this.deviceService.getListAssigned({
      search: params
    }).map((devices) => {
      this.devices = devices;
    });
  }

  loadAlert(): Observable<any> {
    const project_id = this.project.id;
    return this.projectAlertService.get(project_id);
  }

  buildInitAlertData() {
    let { alert } = this;
    if (alert.interval === null) {
      alert.interval = 1;
    }
    this.interval.minute = alert.interval % 60;
    this.interval.hour = (alert.interval - this.interval.minute) / 60;
    if (alert.interval === null) {
      alert.interval = 1;
    }
    if (alert.rules === null) {
      alert.rules = [];
    }

    // Join device to the alert by device_uuid
    alert.rules.forEach(rule => {
      const uuid = rule.device_uuid;
      const { devices } = this;
      const foundDevice = devices.filter(device => {
        return device.uuid === uuid;
      })[0];

      if (foundDevice) {
        rule.device = foundDevice;
      } else {
        console.error(`Cannot found ${uuid} in device list!`);
      }
    });
  }

  saveAlert() {
    const project_id = this.project.id;
    let submitAlert = Object.assign({}, {
      ...this.alert,
      rules: this.alert.rules.map(rule => Object.assign({}, rule))
    });
    submitAlert.interval = parseInt(this.interval.hour, 10) * 60 + parseInt(this.interval.minute, 10);
    submitAlert.rules.forEach((rule) => {
      rule.device_uuid = rule.device.uuid;
      delete rule.device;
      delete rule.last_alert;
    });
    submitAlert.rules = JSON.stringify(submitAlert.rules);
    this.projectAlertService.put(project_id, {
      alert: submitAlert
    })
    .subscribe(() => {
      this.notificationService.showMessage('Alert updated successfully!');
    });
  }

  addRule() {
    this.alertRuleModal.open()
    .subscribe((rule) => {
      this.alert.rules.push(rule);
    });
  }

  remove(rule) {
    let { rules } = this.alert;
    const index = rules.indexOf(rule);
    rules.splice(index, 1);
  }
}
