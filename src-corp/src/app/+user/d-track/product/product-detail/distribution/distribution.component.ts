import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/utils/notification.service';

@Component({
  selector: 'distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {

  distributions: any[] = [];
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.distributions = [
      {name: 'Sieu thị Nguyên Kim', email: 'nguyenkim@gmail.com', phone: '01224468', address: 'Ho Chi Minh', logo: 'assets/img/brands/personals/person_1.png'},
      {name: 'Sieu thị Xanh', email: 'xanh@gmail.com', phone: '012244687', address: 'Ho Chi Minh', logo: 'assets/img/brands/personals/person_1.png'},
      {name: 'Sieu thị O', email: 'sieuthio@gmail.com', phone: '012244682', address: 'Ho Chi Minh', logo: 'assets/img/brands/personals/person_1.png'},
    ];
  }

  onRemove(item) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this material?`
    }, () => {

      this.notificationService.showMessage(`Remove successfully!`);
    });
  }

}
