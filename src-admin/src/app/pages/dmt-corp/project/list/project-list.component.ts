import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationService } from '../../../../_core/services/notification.service';
import { ProjectService } from '../core/project.service';

@Component({
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
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
  constructor(private router: Router,
              private notificationService: NotificationService,
              private projectService: ProjectService
              ) {
  }

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    this.projectService.getAll()
    .subscribe((projects) => {
      this.source.load(projects);
    })
  }

  delete(row) {
    const project = row.data;
    this.notificationService.confirm('Do you want to delete this project?')
    .subscribe(() => {
      this.projectService.delete(project.id)
      .subscribe(data => {
        this.notificationService.showMessage('Delete project successfully!');
        this.loadProject();
      });
    });
  }

  edit(row) {
    const project = row.data;
    this.router.navigate([`/pages/corporation/project/${project.id}/edit`]);
  }
}
