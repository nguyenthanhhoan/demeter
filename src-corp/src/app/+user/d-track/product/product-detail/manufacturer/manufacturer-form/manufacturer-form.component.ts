import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
declare var $: any;

@Component({
  selector: 'manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit {

  manufacturer: any = {};
  mode: string;

  @ViewChild('lgModal') public lgModal: ModalDirective;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  open(manufacturer) {
    this.lgModal.show();
     Object.keys(this.manufacturer).forEach((key) => { delete this.manufacturer[key]; });
    if (manufacturer) {
      this.mode = 'edit';
       Object.assign(this.manufacturer, manufacturer);
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

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (this.mode === 'edit') {
      let submitImage: any;
      if (fileList.length > 0) {
        submitImage = fileList[0];
      }
      // this.projectService.updateImage(this.project.id, submitImage)
      // .subscribe((res) => {
      //  this.project.image = res.image;
      //  this.notificationService.showMessage('Change image successfully!');
    // });
    } else {
      if (fileList.length > 0) {
        this.manufacturer.image = fileList[0];
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
