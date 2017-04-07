import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-user-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  zone_id: any;
  project_id: any;
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let segments = this.route.snapshot['_urlSegment'].segments;
    for (let index = 0; index < segments.length; index++) {
      var element = segments[index];
      if (element.path === 'project') {
        this.project_id = +segments[index + 1].path;
      }

      if (element.path === 'zone') {
        this.zone_id = +segments[index + 1].path;
      }
    }
  }
}
