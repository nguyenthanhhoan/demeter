import { ISubscription } from 'rxjs/Subscription';
import { Component, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { CameraService } from '../../../../../core/api/services/camera.service';

@Component({
  selector: 'camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss']
})
export class CameraModalComponent {
  @ViewChild('lgModal')
  lgModal: any;
  camera: any = { };
  mode: String;
  private broadcast: Subject<any>;
  private storeSubscription: ISubscription;
  private project_id: Number;
  constructor(private store: Store<any>,
              private cameraService: CameraService) {}

  ngOnInit() {
    this.storeSubscription = this.store.select('app')
    .subscribe((app: any) => {
      if (app.project && app.project.id) {
        this.project_id = app.project.id;
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  open(camera) {
    if (typeof camera === 'undefined') {
      this.mode = 'add';
      this.camera = {
        family_project_id: this.project_id
      };
    } else {
      this.mode = 'edit';
      this.camera = Object.assign({
        family_project_id: this.project_id
      }, camera);
    }
    this.broadcast = new Subject();
    this.lgModal.show();
    return this.broadcast;
  }

  addOrUpdate() {
    if (this.mode === 'add') {
      this.cameraService.post(this.camera)
      .subscribe(() => {
        this.broadcast.next();
        this.lgModal.hide();
      });
    } else {
      this.cameraService.put(this.camera)
      .subscribe(() => {
        this.broadcast.next();
        this.lgModal.hide();
      });
    }
  }

  cancel() {
    this.lgModal.hide();
  }
}
