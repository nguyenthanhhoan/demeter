import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
export class OKRFormComponent implements OnInit {

  objective: any = {
    key_results: []
  };
  numberOfKeyResult: number;

  project_id: number;
  zone_id: number;
  objective_id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private zoneService: ZoneService,
              private notificationService: NotificationService,
              private okrObjectiveService: OkrObjectiveService) {
    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
    this.objective_id = +this.route.snapshot.params['objective_id'];
  }

  ngOnInit() {
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
      
    });
  }

  archiveObjective() {
    this.notificationService.confirmBox({
      content: 'Do you want to archive this Objective?'
    }, () => {
      
    });
  }

  saveObjective() {
    this.okrObjectiveService.put(this.objective)
    .subscribe(() => {
      this.notificationService.showMessage('Updated Objective successfully!');
    });
  }

  cancelObjective() {
    this.router.navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/okr`]);
  }

  addKeyResult() {
    let key_results = this.objective.key_results;
    key_results.push({});
  }

  changePIC(pic, key_result) {
    key_result.pic = pic;
  }
}
