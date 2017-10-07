import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

declare var moment: any;
@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html'
})
export class NoteFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  note: any = {};
  mode: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  open(note) {
    this.lgModal.show();
    Object.keys(this.note).forEach((key) => { delete this.note[key]; });
    if (note) {
      this.mode = 'edit';
      Object.assign(this.note, note);
    } else {
      this.mode = 'add';
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    this.resolve.emit(this.note);
  }

}
