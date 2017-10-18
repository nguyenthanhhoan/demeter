import { Component, NgZone, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../../../_core/services/notification.service';
import { GatewayFieldService } from '../../core/gateway-field.service';
@Component({
  templateUrl: './device-field-list.component.html',
  styleUrls: ['./device-field-list.component.scss']
})
export class DeviceFieldListComponent implements OnInit {

  datatable: any;
  device_id: number;
  options: any;
  source: LocalDataSource = new LocalDataSource();
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
        type: 'number'
      },
      field_id: {
        title: 'Field ID',
        type: 'string',
      },
      name_display: {
        title: 'Name Display',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      value: {
        title: 'Value',
        type: 'string',
      },
      last_updated: {
        title: 'Last Updated',
        type: 'string',
      }
    },
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private gatewayFieldService: GatewayFieldService
              ) {

  }

  ngOnInit() {
    this.loadGatewayField();
  }

  loadGatewayField() {
    this.device_id = +this.route.snapshot.params['device_id'];
    this.gatewayFieldService.getAll(this.device_id)
    .subscribe((fields) => {
      this.source.load(fields);
    })
  }

  delete(row) {
    const field = row.data;
    this.notificationService.confirm('Do you want to delete this field?')
    .subscribe(() => {
      this.gatewayFieldService.delete(this.device_id, field.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete field successfully!');
        this.loadGatewayField();
      });
    });
  }

  edit(row) {
    const field = row.data;
    this.router.navigate([`/pages/corporation/gateway/${this.device_id}/field/${field.id}`]);
  }
}
