import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

declare var $: any;
@Component({
  selector: 'distribution-form',
  templateUrl: './distribution-form.component.html',
  styleUrls: ['./distribution-form.component.scss']
})
export class DistributionFormComponent implements OnInit {

  @ViewChild('lgModal') public lgModal: ModalDirective;

  distributor: any = {};
  mode: string;

  @Input()
  type: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  open(distributor) {
    this.lgModal.show();
     Object.keys(this.distributor).forEach((key) => { delete this.distributor[key]; });
    if (distributor) {
      this.mode = 'edit';
       Object.assign(this.distributor, distributor);
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
        // this.project.image = res.image;
       //  this.notificationService.showMessage('Change image successfully!');
      // });
    } else {
      if (fileList.length > 0) {
        this.distributor.image = fileList[0];
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
