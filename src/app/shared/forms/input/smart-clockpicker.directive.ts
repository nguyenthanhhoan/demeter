import {Directive, ElementRef, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[smartClockpicker]'
})
export class SmartClockpickerDirective implements OnInit {

  @Input() smartClockpicker: any;
  @Output() valueChange = new EventEmitter();

  constructor(private el:ElementRef) {
  }

  ngOnInit() {
    System.import('script-loader!clockpicker/dist/bootstrap-clockpicker.min.js').then(()=> {
      this.render()
    })
  }


  render() {
    let el = $(this.el.nativeElement);
    el.clockpicker(this.smartClockpicker || {
      placement: 'top',
      donetext: 'Done',
      afterDone: () => {
        this.valueChange.emit(el.val());
      }
    });
  }

}
