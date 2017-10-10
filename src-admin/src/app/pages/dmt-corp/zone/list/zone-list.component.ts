import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../../_core/services/notification.service';
import { ZoneService } from '../core/zone.service';

@Component({
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {
  settings = {
    actions: {
      add: false,
    },
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      location: {
        title: 'location',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private http: Http,
              private router: Router,
              private notificationService: NotificationService,
              private zoneService: ZoneService
              ) {

  }

  ngOnInit() {
    this.loadZone();
  }

  loadZone() {
    this.zoneService.getAll()
    .subscribe((zones) => {
      this.source.load(zones);
    })
  }

  delete(row) {
    const zone = row.data;
    this.notificationService.confirm('Do you want to delete this zone?')
    .subscribe(() => {
      this.zoneService.delete(zone.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete zone successfully!');
        this.loadZone();
      });
    });
  }

  edit(row) {
    const zone = row.data;
    this.router.navigate([`/pages/corporation/zone/${zone.id}/edit`]);
  }
}
