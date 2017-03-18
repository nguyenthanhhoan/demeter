import {Directive, ElementRef, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

declare var $:any;

@Directive({
  selector: '[saUiDatepicker]'
})
export class UiDatepickerDirective implements OnInit {

  private el: any;

  constructor(el:ElementRef) {
    this.el = el.nativeElement;
  }
  @Input() saUiDatepicker:any;
  @Output() valueChange = new EventEmitter();

  ngOnInit() {
    let onSelectCallbacks = [];
    let saUiDatepicker = this.saUiDatepicker || {};
    let element = $(this.el);

    if (saUiDatepicker.minRestrict) {
      onSelectCallbacks.push((selectedDate)=> {
        $(saUiDatepicker.minRestrict).datepicker('option', 'minDate', selectedDate);
      });
    }
    if (saUiDatepicker.maxRestrict) {
      onSelectCallbacks.push((selectedDate)=> {
        $(saUiDatepicker.maxRestrict).datepicker('option', 'maxDate', selectedDate);
      });
    }

    //Let others know about changes to the data field
    onSelectCallbacks.push((selectedDate) => {
      this.valueChange.emit(selectedDate);
    });

    let options = $.extend(saUiDatepicker, {
      prevText: '<i class="fa fa-chevron-left"></i>',
      nextText: '<i class="fa fa-chevron-right"></i>',
      onSelect: (selectedDate) =>{
        onSelectCallbacks.forEach((callback) =>{
          callback.call(callback, selectedDate)
        })
      }
    });

    element.datepicker(options);


  }


}
