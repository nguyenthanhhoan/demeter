import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as Chartist from 'chartist';

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
  constructor(private router: Router) { 
  }

  ngOnInit() {
  }

}
