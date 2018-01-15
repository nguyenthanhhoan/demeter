import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/utils/notification.service';

@Component({
  selector: 'manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {

  manufacturers: any[] = [];
  manufacturingProcesses: any[] = [];
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.manufacturers = [
      {id: 1, address: 'da nang', manufacturerPlace: 'ngu hanh son', image: 'assets/img/brands/personals/person_1.png'},
      {id: 2, address: 'Ho Chi Minh', manufacturerPlace: 'Da Nang', image: 'assets/img/brands/personals/person_1.png'},
      {id: 3, address: 'Ho Chi Minh', manufacturerPlace: 'Da Nang', image: 'assets/img/brands/personals/person_1.png'}
    ];

    this.manufacturingProcesses = [
      {id: 1, manufacturingProcessesName: 'dao dat', description: 'làm đất', image: 'assets/img/brands/personals/person_1.png'},
      {id: 2, manufacturingProcessesName: 'giao hat', description: 'gieo hat', image: 'assets/img/brands/personals/person_1.png'},
      {id: 3, manufacturingProcessesName: 'phun thuoc', description: 'phun thuoc', image: 'assets/img/brands/personals/person_1.png'}
    ]
  }

  onRemove(item) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this material?`
    }, () => {

      this.notificationService.showMessage(`Remove successfully!`);
    });
  }

}
