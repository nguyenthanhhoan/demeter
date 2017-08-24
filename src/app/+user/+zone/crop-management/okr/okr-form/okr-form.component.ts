import { ISubscription } from 'ng2-nvd3/node_modules/rxjs/Subscription';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppSettings } from '../../../../../app.settings';
import { ZoneService } from '../../../../../core/services/zone.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';
import { OkrObjectiveService } from '../../../../../core/services/okr-objective.service';

declare var moment: any;
@Component({
  selector: 'okr-form',
  templateUrl: './okr-form.component.html',
  styleUrls: ['./okr-form.component.css']
})
export class OKRFormComponent implements OnInit, OnDestroy {

  objective: any = {
    key_results: []
  };
  numberOfKeyResult: number;

  project_id: number;
  zone_id: number;
  objective_id: number;
  storeObservable: ISubscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>,
              private zoneService: ZoneService,
              private notificationService: NotificationService,
              private okrObjectiveService: OkrObjectiveService) {
    this.objective_id = +this.route.snapshot.params['objective_id'];
  }

  ngOnInit() {
    this.storeObservable = this.store.select('zone')
    .subscribe((zoneModel: any) => {
      if (zoneModel.loaded) {
        this.zone_id = zoneModel.zoneId;
        this.project_id = zoneModel.projectId;
        this.loadOkrObjective();
      }
    });
  }

  ngOnDestroy() {
    this.storeObservable.unsubscribe();
  }

  loadOkrObjective() {
    this.okrObjectiveService.getOne(this.objective_id)
    .subscribe((objective) => {
      this.objective = objective;
    });
  }

  removeKeyResult(key_result) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Key Result?'
    }, () => {
      key_result._destroy = true;
    });
  }

  deleteObjective() {
    this.notificationService.confirmBox({
      content: 'Do you want to delete this Objective?'
    }, () => {
      this.okrObjectiveService.delete(this.objective.id)
      .subscribe((() => {
        this.notificationService.showMessage('Delete Objective successfully!');
        this.router.navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/crop-management/okr`]);
      }));
    });
  }

  archiveObjective() {
    this.notificationService.confirmBox({
      content: 'Do you want to archive this Objective?'
    }, () => {
      this.okrObjectiveService.delete(this.objective.id)
      .subscribe((() => {
        this.router.navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/crop-management/okr`]);
      }));
    });
  }

  saveObjective() {
    this.okrObjectiveService.put(this.objective)
    .subscribe(() => {
      this.notificationService.showMessage('Updated Objective successfully!');
      this.router.navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/crop-management/okr`]);
    });
  }

  cancelObjective() {
    this.router.navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/crop-management/okr`]);
  }

  addKeyResult() {
    let key_results = this.objective.key_results;
    key_results.push({});
  }

  changePIC(pic, key_result) {
    key_result.pic = pic;
  }
}
