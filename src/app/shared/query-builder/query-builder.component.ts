import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-query-builder',
  template: `<ng-content></ng-content>`
})
export class QueryBuilderComponent implements OnInit, OnChanges {

  @Input() filters: any[];
  @Input() rules: any[];

  queryBuilder;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.initQueryBuilder();
  }

  ngOnInit() {
    this.initQueryBuilder();
  }

  initQueryBuilder() {
    let ele = $(this.el.nativeElement);
    if (ele.queryBuilder) {
      ele.queryBuilder('destroy');
    }
    this.queryBuilder = ele.queryBuilder({
      filters: this.filters,
      rules: this.rules
    });
  }

  getRules() {
    let rules = $(this.el.nativeElement).queryBuilder('getRules');
    if (rules === null) {
      rules = {};
    }
    return rules;
  }

  validate() {
    return $(this.el.nativeElement).queryBuilder('validate');
  }
}
