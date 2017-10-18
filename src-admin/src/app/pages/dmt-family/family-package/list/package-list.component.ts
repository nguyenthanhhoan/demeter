import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomRenderComponent } from './custom-render.component';
import { PackageService } from '../shared/package.service';
import { ApiService } from '../../../../_core/api/api.service';
import { NotificationService } from '../../../../_core/services/notification.service';

declare var window: any;
@Component({
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {

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
      uuid: {
        title: 'UUID',
        type: 'string',
      },
      serial_name: {
        title: 'Serial Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router,
              private apiService: ApiService,
              private notificationService: NotificationService,
              private ngZone: NgZone,
              private packageService: PackageService) {

  }

  ngOnInit() {
    this.loadPackage();
  }

  loadPackage() {
    this.packageService.getAll()
    .subscribe((packages) => {
      this.source.load(packages);
    })
  }

  delete(row) {
    const packageData = row.data;
    this.notificationService.confirm('Do you want to delete this package?')
    .subscribe(() => {
      this.packageService.delete(packageData.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete package successfully!');
        this.loadPackage();
      });
    });
  }

  edit(row) {
    const packageData = row.data;
    this.router.navigate([`/pages/family/package/${packageData.id}/edit`]);
  }
}
