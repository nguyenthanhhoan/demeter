import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

declare var $: any;
@Component({
  selector: 'distribution-from',
  templateUrl: './distribution-from.component.html',
  styleUrls: ['./distribution-from.component.scss']
})
export class DistributionFromComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;

  distributor: any = {};
  mode: string;
  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  open(distributor) {
    this.lgModal.show();
    // Object.keys(this.harvesting).forEach((key) => { delete this.harvesting[key]; });
    if (distributor) {
      this.mode = 'edit';
      // Object.assign(this.harvesting, harvesting);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    // this.resolve.emit(this.harvesting);
  }

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }

}
