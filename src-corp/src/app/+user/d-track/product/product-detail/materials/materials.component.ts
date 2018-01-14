import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/utils/notification.service';

@Component({
  selector: 'materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  materials: any[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.materials = [
      {name: 'đậu phộng', origin: 'hop tac xa dong tam', blockCode: '123'},
      {name: 'đậu xanh', origin: 'hop tac xa dong tien', blockCode: '321'}
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
