import { Component, Input, OnChanges, OnInit, ElementRef } from '@angular/core';
let Plotly = require('plotly.js/lib/core');
declare var $: any;

@Component({
  selector: 'multiple-chart',
  templateUrl: './multiple-chart.component.html',
  styleUrls: ['./multiple-chart.component.scss']
})
export class MultipleChartComponent implements OnInit, OnChanges {

  @Input()
  chartData: any;
  constructor(private el: ElementRef) {

  }

  ngOnInit() {
    // this.drawDemoChart();
  }

  ngOnChanges() {
    if (this.chartData && this.chartData.data && this.chartData.data.length > 0) {
      this.initChart();
    } else {
      $(this.el.nativeElement).find('.chart-holder').html('');
    }
  }

  initChart() {
    let chartEle = $(this.el.nativeElement).find('.chart-holder')[0];
    Plotly.newPlot(chartEle, this.chartData.data, this.chartData.layout);
  }

  drawDemoChart() {
    let trace1 = {
      x: [1, 2, 3],
      y: [4, 5, 6],
      name: 'yaxis1 data',
      type: 'scatter'
    };

    let trace2 = {
      x: [2, 3, 4],
      y: [40, 50, 60],
      name: 'yaxis2 data',
      yaxis: 'y2',
      type: 'scatter'
    };

    let trace3 = {
      x: [4, 5, 6],
      y: [40000, 50000, 60000],
      name: 'yaxis3 data',
      yaxis: 'y3',
      type: 'scatter'
    };

    let trace4 = {
      x: [5, 6, 7],
      y: [400000, 500000, 600000],
      name: 'yaxis4 data',
      yaxis: 'y4',
      type: 'scatter'
    };

    let data = [trace1, trace2, trace3, trace4];

    let layout = {
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      title: 'multiple y-axes example',

      // Sets the domain of this axis (in plot fraction).
      // Each object has one or more of the keys listed below.
      xaxis: {domain: [0.15, 0.85]},
      yaxis: {
        title: 'yaxis title',
        titlefont: {color: '#1f77b4'},
        tickfont: {color: '#1f77b4'},
        overlaying: 'y',
        side: 'left',
        position: 0.1
      },
      yaxis2: {
        title: 'yaxis2 title',
        titlefont: {color: '#ff7f0e'},
        tickfont: {color: '#ff7f0e'},
        overlaying: 'y',
        side: 'left',
        position: 0
      },
      yaxis3: {
        title: 'yaxis4 title',
        titlefont: {color: '#d62728'},
        tickfont: {color: '#d62728'},
        overlaying: 'y',
        side: 'right',
        position: 0.85
      },
      yaxis4: {
        title: 'yaxis5 title',
        titlefont: {color: '#9467bd'},
        tickfont: {color: '#9467bd'},
        overlaying: 'y',
        side: 'right',
        position: 0.95
      }
    };

    Plotly.newPlot('myDiv', data, layout);
  }
}
