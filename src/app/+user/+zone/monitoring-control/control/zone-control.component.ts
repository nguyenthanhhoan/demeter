import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { AppSettings } from '../../../../app.settings';
import { DeviceFieldService } from '../../../../core/services/device-field-service';
import { NotificationService } from '../../../../shared/utils/notification.service';

@Component({
  selector: 'zone-control',
  templateUrl: './zone-control.component.html',
  styleUrls: ['./zone-control.component.scss']
})
export class ZoneControlComponent {
  zone_id: number;
  activeTab: number = 0;

  constructor(private route: ActivatedRoute,
              private deviceFieldService: DeviceFieldService,
              private ngZone: NgZone,
              private notificationService: NotificationService) {
    this.zone_id = +this.route.snapshot.params['id'];
  }

}
