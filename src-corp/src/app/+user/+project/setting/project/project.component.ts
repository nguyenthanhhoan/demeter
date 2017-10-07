import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'project-setting-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  project: any = {};
  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.select('project')
    .takeWhile(() => {
      return (typeof this.project.id === 'undefined');
    })
    .subscribe((projectModel: any) => {
      if (projectModel.loaded) {
        this.project = Object.assign({}, projectModel.project);
      }
    });
  }

}
