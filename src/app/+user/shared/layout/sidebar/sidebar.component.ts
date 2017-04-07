import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'demeter-user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  goToPage(name) {
    let segments = this.route.snapshot['_urlSegment'].segments;
    var id, project_id;
    for (let index = 0; index < segments.length; index++) {
      var element = segments[index];
      if (element.path === 'project') {
        project_id = +segments[index + 1].path;
      }

      if (element.path === 'zone') {
        id = +segments[index + 1].path;
      }
    }

    //If project_id present in url -> it's was link to zone detail page
    var url = `/user`;
    if (project_id) {
      url += `/project/${project_id}/zone/${id}`;
    } else {
      url += `/project/${id}`;
    }
    this.router.navigate([`${url}/${name}`]);
  }
}
