import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FadeZoomInTop } from "../../../../shared/animations/fade-zoom-in-top.decorator";

@FadeZoomInTop()
@Component({
  selector: 'app-user-layout-project-list',
  templateUrl: './user-layout-project-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserLayoutProjectListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
