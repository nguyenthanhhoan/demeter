import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  state = {
    tabs: {
      activeTab: 0
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
