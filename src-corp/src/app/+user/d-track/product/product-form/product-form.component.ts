import { Component, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
declare var $: any;

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

  constructor(private el: ElementRef) {
  }

  open(product) {
    this.lgModal.show();
     Object.keys(this.product).forEach((key) => { delete this.product[key]; });
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

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (this.mode === 'edit') {
      let submitImage: any;
      if (fileList.length > 0) {
        submitImage = fileList[0];
      }
      // this.projectService.updateImage(this.project.id, submitImage)
      // .subscribe((res) => {
      //   this.project.image = res.image;
      //   this.notificationService.showMessage('Change image successfully!');
      // });
    } else {
      if (fileList.length > 0) {
        this.product.image = fileList[0];
      }
      this.readURL(event.target);
    }
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $('.upload-preview').css('background-image', 'url(' + e.target['result'] + ')');
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

}
