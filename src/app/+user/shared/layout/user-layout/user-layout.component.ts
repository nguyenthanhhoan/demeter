import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FadeZoomInTop } from "../../../../shared/animations/fade-zoom-in-top.decorator";

@FadeZoomInTop()
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
