import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent {
  constructor(private router: Router) {
  }

  goToCreate() {
    this.router.navigate(['/user/d-track/new']);
  }
  goToDetail(brandId) {
    this.router.navigate([`/user/${brandId}/detail`]);
  }
}
