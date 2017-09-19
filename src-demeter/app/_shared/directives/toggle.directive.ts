import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $: any;
@Directive({
  selector: '[dmtToggle]'
})
export class ToggleDirective implements OnInit {
  @Input()
  private ngModel;
  @Output()
  private ngModelChange = new EventEmitter();
  @Input()
  private size: string;
  private checkboxEle;
  constructor(private menu: ElementRef) {
    this.checkboxEle = $(this.menu.nativeElement);
  }

  ngOnInit() {
    this.checkboxEle.bootstrapSwitch({
      state: this.ngModel,
      size: this.size,
      onSwitchChange: (event, state) => {
        this.ngModelChange.emit(state);
      }
    });
  }
}
