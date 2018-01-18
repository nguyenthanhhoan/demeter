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
  @Input('brand') brand: any;
  @Output('closeModal') closeModal = new EventEmitter<any>();

  constructor(private router: Router,
              private el: ElementRef) {
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
        this.brand.logo = fileList[0];
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
