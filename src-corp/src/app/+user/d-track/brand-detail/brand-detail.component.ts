import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.scss']
})
export class BrandDetailComponent {
  state = {
    tabs: {
      activeTab: 0
    }
  };
  constructor(private router: Router) {
  }
}
