import {Component, AfterContentInit, ElementRef, Input} from '@angular/core';

import {presets} from './chart-js.presets'

declare var Chart:any;

@Component({

  selector: 'sa-chart-js',
  template: `
    <div>
      <canvas></canvas>
    </div>
  `,
  styles: []
})
export class ChartJsComponent implements AfterContentInit {

  @Input() public data:any;
  @Input() public options: any;
  @Input() public type:string;
  @Input() width:string = '100%';
  chart: any;

  constructor(private el:ElementRef) {
  }

  ngAfterContentInit() {
    System.import('chart.js').then((chartJs:any)=> {
        this.render()
    })
  }

  render(){
    let ctx = this.getCtx();
    let data = this.data;
    let options = presets[this.type] || {};
    Object.assign(options, this.options);

    this.chart = new Chart(ctx, {type: this.type, data: data, options: options});
    this.chart.update();
  }

  private getCtx() {
    return this.el.nativeElement.querySelector('canvas').getContext('2d');
  }

}
