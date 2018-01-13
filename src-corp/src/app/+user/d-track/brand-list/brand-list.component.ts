import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../../../core/services/brand.service';

@Component({
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  brands: any[];

  constructor(private router: Router, private brandService: BrandService) {
    this.brands = brandService.getBrands();
  }

  ngOnInit() {
  }

  goToCreate() {
    this.router.navigate(['/user/d-track/new']);
  }
}
