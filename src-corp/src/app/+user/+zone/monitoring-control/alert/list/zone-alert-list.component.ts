import { URLSearchParams } from '@angular/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { AlertService } from '../../../../../core/services/alert.service';

@Component({
  selector: 'zone-alert-list',
  templateUrl: './zone-alert-list.component.html',
  styleUrls: ['./zone-alert-list.component.scss']
})
export class ZoneAlertListComponent implements OnInit, OnDestroy {

  alerts: any[];

  zoneId: number;
  totalItems: number;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  loading: boolean = false;
  private zoneSubscription: ISubscription;

  constructor(private store: Store<any>,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.zoneSubscription = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zoneId = zoneModel.zoneId;
        this.loadAlerts();
      }
    });
  }

  ngOnDestroy() {
    this.zoneSubscription.unsubscribe();
  }

  loadAlerts() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('zone_id', this.zoneId.toString());
    params.set('page', this.currentPage.toString());
    params.set('per_page', this.itemsPerPage.toString());
    this.loading = true;
    this.alertService.list({
      search: params
    })
    .delay(1000)
    .subscribe((res: any) => {
      this.loading = false;
      this.alerts = res.items;
      this.totalItems = res.total_items;
    });
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.loadAlerts();
  }
}
