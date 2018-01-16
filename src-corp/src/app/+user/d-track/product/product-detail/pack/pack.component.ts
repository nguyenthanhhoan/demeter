import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/utils/notification.service';

@Component({
  selector: 'pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.scss']
})
export class PackComponent implements OnInit {

  packs: any[] = [];
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.packs = [
      {packingUnit: 'Co so dong goi A', address: 'Ho Chi Minh', description: 'cơ sở đóng gói sản phẩm.', image: 'assets/img/brands/personals/person_1.png'},
      {packingUnit: 'Co so dong goi B', address: 'Ho Chi Minh', description: 'cơ sở đóng gói sản phẩm.', image: 'assets/img/brands/personals/person_1.png'},
      {packingUnit: 'Co so dong goi C', address: 'Ho Chi Minh', description: 'cơ sở đóng gói sản phẩm.', image: 'assets/img/brands/personals/person_1.png'}
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
