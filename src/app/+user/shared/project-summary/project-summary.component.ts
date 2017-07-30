import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {
  @Input()
  project: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.project = {};
      this.projectService.getOne(id).subscribe(data => {
        Object.assign(this.project, data);
      });
    }
  }
}
