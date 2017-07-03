import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  resources: any[];
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

    this.resources = [];
    for (let index = 1; index < segments.length - 1; index += 2) {
      let resource_name = segments[index].path;

      let resource_id = '';
      if (segments[index + 1]) {
        resource_id = segments[index + 1].path;
      }

      let path;

      // For the last segment, only get the resource
      if (index !== segments.length - 2) {
        path = `${resource_name}/${resource_id}`;
      } else {
        path = `${resource_name}`;
      }

      if (index > 1) {
        let lastPath = this.resources[this.resources.length - 1].path;
        path = lastPath + `/${path}`;
      }

      resource_name = resource_name.charAt(0).toUpperCase() + resource_name.slice(1);
      if (resource_name === 'Okr') {
        resource_name = resource_name.toUpperCase();
      }
      this.resources.push({
        name: resource_name,
        path: path
      });
    }
  }
}
