import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
let Plotly = require('plotly.js/lib/core');
declare var $: any;

@Component({
  selector: 'single-chart',
  templateUrl: './single-chart.component.html',
  styleUrls: ['./single-chart.component.scss']
})
export class SingleChartComponent implements OnInit, OnChanges {

  @Input()
  data: any = {};
  constructor(private el: ElementRef) {

  }

  ngOnInit() {
    // this.initDemoChart();
  }

  ngOnChanges() {
    if (this.data && this.data.x && this.data.x.length > 0) {
      this.initChart();
    }
  }

  initChart() {
    let chartEle = $(this.el.nativeElement).find('.chart-holder')[0];
    let layout = {
      title: this.data.name
    };
    Plotly.newPlot(chartEle, [this.data], layout);
  }

  initDemoChart() {
    let chartEle = $(this.el.nativeElement).find('.chart-holder')[0];
    let trace = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    };
    let data = [trace];
    Plotly.newPlot(chartEle, data);
  }
}
