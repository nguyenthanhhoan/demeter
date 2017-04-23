import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { addClassName, removeClassName } from '../../../utils/dom-helpers';

declare var $: any;

@Directive({
  selector: '[select2]'
})
export class Select2Directive implements OnInit {

  @Output()
  onSelect = new EventEmitter();

  constructor(private el: ElementRef) {
    addClassName(this.el.nativeElement, ['sa-cloak', 'sa-hidden'])
  }

  ngOnInit(){
    System.import('script-loader!select2/dist/js/select2.min.js').then(() => {
      let el = $(this.el.nativeElement);
      el.select2();
      el.on('change', (e) => {
        let value = el.val();
        this.onSelect.emit(value);
      });
      removeClassName(this.el.nativeElement, ['sa-hidden']);
    });
  }
}
