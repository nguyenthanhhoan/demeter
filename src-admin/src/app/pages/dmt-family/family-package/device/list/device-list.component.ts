import { Component, NgZone, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../../../_core/services/notification.service';
import { DeviceService } from '../core/device.service';
@Component({
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  datatable: any;
  package_id: number;
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
      name: {
        title: 'Name',
        type: 'string',
      },
      uuid: {
        title: 'uuid',
        type: 'string',
      },
      field_attribute: {
        title: 'Attribute',
        type: 'string',
      },
      mode: {
        title: 'Mode',
        type: 'string',
      }
    },
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private deviceService: DeviceService
              ) {

  }

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {
    this.package_id = +this.route.snapshot.params['package_id'];
    this.deviceService.getByPackage(this.package_id)
    .subscribe((devices) => {
      this.source.load(devices);
    })
  }

  delete(row) {
    const device = row.data;
    this.notificationService.confirm('Do you want to delete this device?')
    .subscribe(() => {
      this.deviceService.delete(device.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete device successfully!');
        this.loadDevices();
      });
    });
  }

  edit(row) {
    const device = row.data;
    this.router.navigate([`/pages/family/package/${this.package_id}/device/${device.uuid}`]);
  }
}
