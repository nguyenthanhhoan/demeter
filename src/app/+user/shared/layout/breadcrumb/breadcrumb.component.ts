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
    let id = this.route.snapshot.params['id'];
    this.project_id = this.route.snapshot.params['project_id'];
    if (this.project_id) {
      this.zone_id = id;
    } else {
      this.project_id = id;
    }
  }
}
