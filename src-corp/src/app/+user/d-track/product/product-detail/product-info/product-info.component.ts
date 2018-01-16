import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from 'app/shared/utils/notification.service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  @Input()
  product: any

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onRemove(item) {
    this.notificationService.confirmBox({
      content: `Do you want to remove this Image?`
    }, () => {

      this.notificationService.showMessage(`Remove Image successfully!`);
    });
  }
}
