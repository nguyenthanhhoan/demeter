import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare var $: any;
@Directive({
  selector: '[dmtToggle]'
})
export class ToggleDirective implements OnInit {

  @Input()
  private size: string;
  private checkboxEle;
  constructor(private menu: ElementRef) {
    this.checkboxEle = $(this.menu.nativeElement);
  }

  ngOnInit() {
    this.checkboxEle.bootstrapSwitch({
      size: this.size
    });
  }
}
