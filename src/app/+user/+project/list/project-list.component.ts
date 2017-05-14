import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';

import { ProjectService } from '../../../core/services/project.service';
import { LocalStorageService } from '../../../shared/utils/localstorage.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  map: any;
  projects: any[];
  isRequesting: boolean = true;
  constructor(private router: Router,
              private projectService: ProjectService,
              private localStorageService: LocalStorageService) {

    this.isRequesting = true;
    projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.isRequesting = false;
    }, () => {
      this.isRequesting = false;
    });
  }

  ngOnInit() {
  }

  goToCreate() {
    this.router.navigate(['/user/project/new']);
  }

}
