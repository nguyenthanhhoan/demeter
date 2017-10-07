import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import * as Chartist from 'chartist';

import { ProjectService } from '../../../core/services/project.service';
import { GoogleAPI } from '../../../shared/integration/gloader';
import {
  ChartType,
  ChartEvent
} from '../../../shared/graphs/chartist/chartist.component';

declare var google: any;
declare var $: any;

@Component({
  selector: 'project-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  map: any;
  project: any;

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
  }
  constructor(private router: Router,
              private googleAPI: GoogleAPI,
              private ref: ChangeDetectorRef,
              private projectService: ProjectService,
              private el:ElementRef) { 

    this.project = {
      name: '',
      surface: '',
      labour: '',
      location: ''
    };

    //TODO: Refactor later
    setInterval(() => {
      this.ref.markForCheck();
    },1000);
  }

  ngOnInit() {
  }

  onSubmit() {
    var form = $(this.el.nativeElement).find('form');
    const bootstrapValidator = form.data('bootstrapValidator');
    if (bootstrapValidator.isValid()) {
      let submitProject:any = Object.assign({},this.project);
      this.projectService.post(submitProject).subscribe(data => {
        this.router.navigate(['/user/project']);
      });
    }
  }

  updateLocation(location) {
    this.project.location = location.name;
    this.project.location_geometry = location.location_geometry;
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.project.image = fileList[0];
    }
    this.readURL(event.target);
  }

  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click'); 
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.upload-preview').css('background-image', 'url('+e.target['result'] +')');
      }

      reader.readAsDataURL(input.files[0]);
    }
  }
}
