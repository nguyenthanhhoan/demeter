import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: any[] = [];

  constructor() { }

  ngOnInit() {
    this.products = [
      {name: 'product1'},
      {name: 'product2'},
      {name: 'product3'},
      {name: 'product4'},
      {name: 'product5'}
    ];
  }

}
