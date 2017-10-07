import {Directive, ElementRef, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[smartClockpicker]'
})
export class SmartClockpickerDirective implements OnInit {

  @Input() smartClockpicker: any;
  @Output() valueChange = new EventEmitter();
  private clockValue: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    System.import('script-loader!clockpicker/dist/bootstrap-clockpicker.min.js').then(() => {
      this.render();
    });
  }

  @Input()
  get value() {
    return this.clockValue;
  }

  set value(val) {
    this.clockValue = val;
    this.valueChange.emit(this.clockValue);
    let el = $(this.el.nativeElement);
    el.val(val);
  }

  render() {
    let el = $(this.el.nativeElement);
    el.clockpicker(this.smartClockpicker || {
      placement: 'bottom',
      donetext: 'Done',
      afterDone: () => {
        this.value = el.val();
      }
    });
  }

}
