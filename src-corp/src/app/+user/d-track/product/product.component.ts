import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../core/services/brand.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  private brand: any;

  constructor(private router: Router, private route: ActivatedRoute, private brandService: BrandService) { }

  ngOnInit() {
    let brandId = this.route.snapshot.params['id'];
    this.brand = this.brandService.getOne(brandId);
  }

}
