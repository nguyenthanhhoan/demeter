import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-user-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  zone_id: any;
  project_id: any;
  last_segment: any;
  constructor(private router: Router,
              private route: ActivatedRoute) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.update();
      }
    });
  }

  update() {
    let segments = this.route.snapshot['_urlSegment'].segments;
    this.project_id = null;
    this.zone_id = null;
    this.last_segment = null;
    for (let index = 0; index < segments.length; index++) {
      var element = segments[index];
      if (element.path === 'project') {
        this.project_id = +segments[index + 1].path;
      }

      if (element.path === 'zone') {
        this.zone_id = +segments[index + 1].path;
      }
    }
    let lastSegment = segments[segments.length - 1];

    //Last segment is not an integer
    if (!/^\d+$/.test(lastSegment.path) && lastSegment.path.length > 0) {
      this.last_segment = lastSegment.path.charAt(0).toUpperCase() + lastSegment.path.slice(1);;
    }
  }
}
