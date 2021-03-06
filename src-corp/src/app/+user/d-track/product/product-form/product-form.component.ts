import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  @ViewChild('lgModal') public lgModal: ModalDirective;
  @Output() resolve = new EventEmitter();

  @Input()
  type: any;

  product: any = {};
  mode: string;

  constructor() {
  }

  open(product) {
    this.lgModal.show();
    this.mode = 'edit';
    // Object.keys(this.harvesting).forEach((key) => { delete this.harvesting[key]; });
    if (product) {
      this.mode = 'edit';
      Object.assign(this.product, product);
    } else {
      this.mode = 'add';
    }
  }

  onClose(event) {
    if (event === 'close') {
      this.lgModal.hide();
    }
  }

  saveOrUpdate() {
    this.lgModal.hide();
    // this.resolve.emit(this.harvesting);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    // if (this.mode === 'edit') {
    //   let submitImage: any;
    //   if (fileList.length > 0) {
    //     submitImage = fileList[0];
    //   }
    //   this.projectService.updateImage(this.project.id, submitImage)
    //   .subscribe((res) => {
    //     this.project.image = res.image;
    //     this.notificationService.showMessage('Change image successfully!');
    //   });
    // } else {
    //   if (fileList.length > 0) {
    //     this.project.image = fileList[0];
    //   }
    //   this.readURL(event.target);
    // }
  }

}
