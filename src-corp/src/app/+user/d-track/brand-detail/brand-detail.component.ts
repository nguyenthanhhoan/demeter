import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../core/services/brand.service';

@Component({
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.scss']
})
export class BrandDetailComponent implements OnInit {
  state = {
    tabs: {
      activeTab: 0
    }
  };
  private brand: any;

  ngOnInit() {
    let brandId = this.route.snapshot.params['id'];
    this.brand = this.brandService.getOne(brandId);
  }

  constructor(private router: Router, private route: ActivatedRoute, private brandService: BrandService) {
  }
} 