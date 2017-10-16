import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <a routerLink="/pages/family/package/{{renderValue}}/device">{{renderValue}}</a>
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value;
  }
}
