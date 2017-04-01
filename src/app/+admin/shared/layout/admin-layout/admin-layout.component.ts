import { Component, OnInit } from '@angular/core';
import {FadeZoomInTop} from "../../../../shared/animations/fade-zoom-in-top.decorator";

@FadeZoomInTop()
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styles: []
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
