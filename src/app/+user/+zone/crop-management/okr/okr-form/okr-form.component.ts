import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AppSettings } from '../../../../../app.settings';
import { ZoneService } from '../../../../../core/services/zone.service';
import { NotificationService } from '../../../../../shared/utils/notification.service';

declare var moment: any;
@Component({
  selector: 'okr-form',
  templateUrl: './okr-form.component.html',
  styleUrls: ['./okr-form.component.css']
})
export class OKRFormComponent {

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
              private notificationService: NotificationService) {
    this.project_id = +this.route.snapshot.params['project_id'];
    this.zone_id = +this.route.snapshot.params['id'];
    this.objective_id = +this.route.snapshot.params['objective_id'];
    this.zoneService.getOKRData(this.project_id, this.zone_id)
      .subscribe((okr_tabs) => {
        let foundObjective = okr_tabs[0].objectives.find((objective) => {
          return (objective.id == this.objective_id);
        });
        if (foundObjective) {
          this.objective = foundObjective;
          this.numberOfKeyResult = this.objective.key_results.length;
        }
      })
  }

  removeKeyResult(key_result) {
    this.notificationService.confirmBox({
      content: 'Do you want to remove this Key Result?'
    }, () => {
      let key_results = this.objective.key_results;
      let index = key_results.indexOf(key_result);
      key_results.splice(index, 1);
    })
  }

  deleteObjective() {
    this.notificationService.confirmBox({
      content: 'Do you want to delete this Objective?'
    }, () => {
      
    })
  }

  archiveObjective() {
    this.notificationService.confirmBox({
      content: 'Do you want to archive this Objective?'
    }, () => {
      
    })
  }

  saveObjective() {
    this.notificationService.showMessage('Updated Objective successfully!');
  }

  cancelObjective() {
    this.router.navigate([`/user/project/${this.project_id}/zone/${this.zone_id}/okr`]);
  }

  addKeyResult() {
    let key_results = this.objective.key_results;
    key_results.push({});
  }
}
