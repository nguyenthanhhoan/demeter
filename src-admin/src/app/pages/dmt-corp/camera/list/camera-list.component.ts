import { Component, NgZone, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../../_core/services/notification.service';
import { CameraService } from '../core/camera.service';

declare var window: any;
@Component({
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.scss']
})
export class CameraListComponent implements OnInit {
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
      camera_no: {
        title: 'Camera No.',
        type: 'string',
      },
      camera_name: {
        title: 'Camera Name',
        type: 'string',
      },
      api: {
        title: 'API',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,
              private notificationService: NotificationService,
              private cameraService: CameraService
              ) {
  }

  ngOnInit() {
    this.loadCamera();
  }

  loadCamera() {
    this.cameraService.getAll()
    .subscribe((cameras) => {
      this.source.load(cameras);
    })
  }

  delete(row) {
    const camera = row.data;
    this.notificationService.confirm('Do you want to delete this camera?')
    .subscribe(() => {
      this.cameraService.delete(camera.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete camera successfully!');
        this.loadCamera();
      });
    });
  }

  edit(row) {
    const camera = row.data;
    this.router.navigate([`/pages/corporation/camera/${camera.id}`]);
  }
}
