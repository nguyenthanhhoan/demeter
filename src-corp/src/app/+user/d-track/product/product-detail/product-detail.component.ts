import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any;

  state = {
    tabs: {
      activeTab: 0
    }
  };

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    let productId = this.route.snapshot.params['productId'];
    this.product = this.productService.getOne(productId);
  }

}
