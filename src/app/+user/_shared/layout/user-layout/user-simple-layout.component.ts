import { Component, OnInit } from '@angular/core';
import { FadeZoomInTop } from '../../../../shared/animations/fade-zoom-in-top.decorator';

@FadeZoomInTop()
@Component({
  selector: 'dmt-user-simple-layout',
  templateUrl: './user-simple-layout.component.html'
})
export class UserSimpleLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
