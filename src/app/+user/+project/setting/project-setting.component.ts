import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss']
})
export class ProjectSettingComponent implements OnInit {

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
