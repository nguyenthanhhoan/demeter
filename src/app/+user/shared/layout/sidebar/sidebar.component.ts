import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'demeter-user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  goToPage(name) {
    let segments = this.route.snapshot['_urlSegment'].segments;
    let zone_id, project_id;
    for (let index = 0; index < segments.length; index++) {
      let element = segments[index];
      if (element.path === 'project') {
        project_id = segments[index + 1].path;
      }

      if (element.path === 'zone') {
        zone_id = segments[index + 1].path;
      }
    }

    // If project_id present in url -> it's was link to zone detail page
    let url = `/user`;
    if (project_id && zone_id) {
      url += `/project/${project_id}/zone/${zone_id}`;
      this.router.navigate([`${url}/${name}`]);
    } else if (name === 'setting') {
      url += `/project/${project_id}`;
      this.router.navigate([`${url}/${name}`]);
    } else {
      url += `/project/${project_id}`;
      alert ('This page is implementing!');
    }
  }
}
