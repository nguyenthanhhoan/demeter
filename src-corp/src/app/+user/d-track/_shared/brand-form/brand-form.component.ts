import {
  ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, Output, EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;
@Component({
  selector: 'brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent {

  @Input('mode') mode: any;
  @Output('closeModal') closeModal = new EventEmitter<any>();

  constructor(private router: Router,
              private el: ElementRef) {
  }

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }
}
