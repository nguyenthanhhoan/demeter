import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../../_core/services/notification.service';
import { GatewayService } from '../core/gateway.service';
import { CustomRenderComponent } from './custom-render.component';
@Component({
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
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
        type: 'custom',
        renderComponent: CustomRenderComponent
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      device_type: {
        title: 'Gateway Type',
        type: 'string',
      },
      api: {
        title: 'API',
        type: 'string',
      }
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router,
              private gatewayService: GatewayService,
              private notificationService: NotificationService
              ) {
  }

  ngOnInit() {
    this.loadGateway();
  }

  loadGateway() {
    this.gatewayService.getAll()
    .subscribe((gateways) => {
      this.source.load(gateways);
    })
  }

  delete(row) {
    const gateway = row.data;
    this.notificationService.confirm('Do you want to delete this gateway?')
    .subscribe(() => {
      this.gatewayService.delete(gateway.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete gateway successfully!');
        this.loadGateway();
      });
    });
  }

  edit(row) {
    const gateway = row.data;
    this.router.navigate([`/pages/corporation/gateway/${gateway.id}/edit`]);
  }
}
