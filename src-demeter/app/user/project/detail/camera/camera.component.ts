import { URLSearchParams } from '@angular/http';
import { ISubscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../../../core/api/services/device.service';

@Component({
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {
  cameras: any = [{
    src: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }, {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }];
  constructor(private store: Store<any>,
              private deviceService: DeviceService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
