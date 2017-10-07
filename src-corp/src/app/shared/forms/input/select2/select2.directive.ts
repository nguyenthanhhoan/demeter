import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addClassName, removeClassName } from '../../../utils/dom-helpers';

declare var $: any;

@Directive({
  selector: '[select2]'
})
export class Select2Directive implements OnInit {

  @Input() data;
  @Output() onSelect = new EventEmitter();

  constructor(private el: ElementRef) {
    addClassName(this.el.nativeElement, ['sa-cloak', 'sa-hidden']);
  }

  ngOnInit(){
    System.import('script-loader!select2/dist/js/select2.min.js').then(() => {
      let el = $(this.el.nativeElement);
      el.select2({
        tags: true
      });
      el.on('change', (e) => {
        let value = el.val();
        this.onSelect.emit(value);
      });

      if (this.data && this.data.length > 0) {
        el.val(this.data).trigger('change');
      }
      removeClassName(this.el.nativeElement, ['sa-hidden']);
    });
  }
}
