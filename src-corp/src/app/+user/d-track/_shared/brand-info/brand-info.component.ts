import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'brand-info',
  templateUrl: './brand-info.component.html',
  styleUrls: ['./brand-info.component.scss']
})
export class BrandInfoComponent implements OnInit {

  @Input()
  brand: any;

  constructor() { }

  ngOnInit() {
  }

}
