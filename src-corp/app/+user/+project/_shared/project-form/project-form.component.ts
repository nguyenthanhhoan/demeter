import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { ResetAction, LoadedAction } from '../../../../core/actions/project-action';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { ProjectService } from '../../../../core/services/project.service';
import { GoogleAPI } from '../../../../shared/integration/gloader';

declare var google: any;
declare var $: any;

@Component({
  selector: 'project-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  @Input()
  project: any = {};

  @Input()
  mode: string;

  map: any;

  validatorOptions = {
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      name: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The name is required'
          }
        }
      },
      surface: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The surface is required'
          }
        }
      },
      labour: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The labour is required'
          }
        }
      }
    }
  };
  constructor(private store: Store<any>,
              private router: Router,
              private googleAPI: GoogleAPI,
              private ref: ChangeDetectorRef,
              private projectService: ProjectService,
              private el: ElementRef,
              private notificationService: NotificationService) {

    // TODO: Refactor later
    setInterval(() => {
      this.ref.markForCheck();
    }, 1000);
  }

  ngOnInit() {
  }

  onSubmit() {
    let form = $(this.el.nativeElement).find('form');
    const bootstrapValidator = form.data('bootstrapValidator');

    // TODO: Sometime the validate() fn from directive was not triggered
    // Should trigger here!!!
    bootstrapValidator.validate();
    if (bootstrapValidator.isValid()) {
      let submitProject: any = Object.assign({}, this.project);
      if (this.mode === 'edit') {
        this.projectService.put(submitProject).subscribe((data) => {
          this.store.dispatch(new ResetAction());
          this.store.dispatch(new LoadedAction(data));
          this.router.navigate([`/user/project/${this.project.id}`]);
        });
      } else {
        this.projectService.post(submitProject).subscribe((data) => {
          this.router.navigate(['/user/project']);
        });
      }
    }
  }

  updateLocation(location) {
    this.project.location = location.name;
    this.project.location_geometry = location.location_geometry;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (this.mode === 'edit') {
      let submitImage: any;
      if (fileList.length > 0) {
        submitImage = fileList[0];
      }
      this.projectService.updateImage(this.project.id, submitImage)
      .subscribe((res) => {
        this.project.image = res.image;
        this.notificationService.showMessage('Change image successfully!');
      });
    } else {
      if (fileList.length > 0) {
        this.project.image = fileList[0];
      }
      this.readURL(event.target);
    }
  }

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
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
