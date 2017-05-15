import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chartist from 'chartist';

import { CameraService } from '../../shared/services/camera.service';

@Component({
  selector: 'camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.css']
})
export class CameraFormComponent implements OnInit {

  camera: any;

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
      zone_id: {
        group: '.form-group',
        validators: {
          notEmpty: {
            message: 'The Zone ID is required'
          }
        }
      }
    }
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cameraService: CameraService,
              private el: ElementRef) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    if (id) {
      this.cameraService.getOne(id)
      .subscribe(data => {
        console.log('data', data);
        this.camera = data;
      });
    }
  }

  onSubmit() {
    let form = $(this.el.nativeElement).find('form');
    const bootstrapValidator = form.data('bootstrapValidator');
    if (bootstrapValidator.isValid()) {
      let submitCamera:any = Object.assign({},this.camera);
      this.cameraService.post(submitCamera).subscribe(data => {
        this.router.navigate(['/admin/camera']);
      });
    }
  }
}
