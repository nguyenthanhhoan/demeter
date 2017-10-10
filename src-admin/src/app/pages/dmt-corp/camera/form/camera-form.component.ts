import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CameraService } from '../core/camera.service';
import { NotificationService } from '../../../../_core/services/notification.service';
@Component({
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.scss']
})
export class CameraFormComponent implements OnInit {

  camera: any = {
    api: 'vp9'
  };
  camera_id: number;
  mode: String;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cameraService: CameraService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.camera_id = +this.route.snapshot.params['camera_id'];
    if (this.camera_id) {
      this.mode = 'Edit';
      this.cameraService.getOne(this.camera_id)
        .subscribe(data => {
          Object.assign(this.camera, data);
        });
    } else {
      this.mode = 'Create';
    }
  }

  saveOrUpdate() {
    const submitCamera = this.camera;
    if (this.mode === 'Edit') {
      this.cameraService.put(submitCamera).subscribe(data => {
        this.notificationService.showMessage('Camera updated successfully!');
        this.router.navigate([`/pages/corporation/camera`]);
      });
    } else {
      this.cameraService.post(submitCamera).subscribe(data => {
        this.notificationService.showMessage('Camera created successfully!');
        this.router.navigate([`/pages/corporation/camera`]);
      });
    }
  }

}
