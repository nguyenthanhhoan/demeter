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
    let id = +this.route.snapshot.params['id'];
    let project_id = +this.route.snapshot.params['project_id'];

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
