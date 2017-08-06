import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { NotificationService } from '../../../../../../shared/utils/notification.service';

@Component({
  selector: 'image-report',
  templateUrl: './image-report.component.html',
  styleUrls: ['./image-report.component.scss']
})
export class ImageReportComponent implements OnInit {

  image_report_types: any[] = [{
    name: 'Diseases'
  }, {
    name: 'Vegetable Growth'
  }];

  image_reports: any[] = [{
    id: 1,
    src: 'assets/img/demo-dmt/benh/benh1.png',
    type: this.image_report_types[0],
    title: 'Date 1'
  }, {
    id: 2,
    src: 'assets/img/demo-dmt/benh/benh2.png',
    type: this.image_report_types[0],
    title: 'Date 1'
  }, {
    id: 3,
    src: 'assets/img/demo-dmt/benh/benh3.png',
    type: this.image_report_types[0],
    title: 'Date 1'
  }, {
    id: 4,
    src: 'assets/img/demo-dmt/benh/benh4.png',
    type: this.image_report_types[0],
    title: 'Date 1'
  }];

  image_report_groups: any[] = [];

  notes = [{
    id: 1,
    name: 'Note 1',
    content: 'Appeared few days ago'
  }, {
    id: 2,
    name: 'Note 2'
  }];

  constructor(private notificationService: NotificationService) {
    for (let index = 0; index < 24; index++) {
      this.image_reports.push({
        id: 5 + index,
        src: 'assets/img/demo-dmt/rau/' + (index + 1) + '.jpeg',
        type: this.image_report_types[1],
        title: 'Date ' + (index + 1)
      });
    }
  }

  ngOnInit() {
    this.buildImageReportGroups();
  }

  imageReportFormResolve(image_report) {
    if (image_report.id) {
      let found = this.image_reports.find((loop_image_report) => {
        return loop_image_report.id === image_report.id;
      });
      Object.assign(found, image_report);
    } else {
      let clone_irr = Object.assign({}, image_report);
      clone_irr.id = (new Date()).getTime();
      this.image_reports.push(clone_irr);
    }
    this.buildImageReportGroups();
  }

  buildImageReportGroups() {
    this.image_reports.forEach((image_report) => {
      image_report.type_name = image_report.type.name;
    });
    let result = _.chain(this.image_reports)
    .groupBy('type_name')
    .toPairs()
    .map(function(currentItem) {
      return _.zipObject(['type_name', 'images'], currentItem);
    })
    .value();
    this.image_report_groups = result;
  }

  remove(item) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this Image?`
    }, () => {
      let index = this.image_reports.indexOf(item);
      this.image_reports.splice(index, 1);
      this.notificationService.showMessage(`Remove Image successfully!`);
      this.buildImageReportGroups();
    });
  }
}
