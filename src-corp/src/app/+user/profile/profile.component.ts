import { Component, ElementRef } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { NotificationService } from '../../shared/utils/notification.service';
import { ApiService } from '../../core/api/api.service';

declare var $: any;
@Component({
  selector: 'dmt-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: any = {};

  constructor(private el: ElementRef,
              private profileService: ProfileService,
              private notificationService: NotificationService,
              private apiService: ApiService) {
    this.apiService.fetch('current_user')
      .subscribe(userRes => {
        this.user = userRes;
      }
    );
  }
  save() {
    this.profileService.put({
      full_name: this.user.full_name
    })
    .subscribe((userRes) => {
      this.user = userRes;
      this.notificationService.showMessage('User updated successfully!');
    });
  }
  cancel() {
  }
  openSelectFile() {
    let file = $(this.el.nativeElement).find('.file-input');
    file.trigger('click');
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
      let submitImage: any;
      if (fileList.length > 0) {
        submitImage = fileList[0];
      }
      this.profileService.updateImage(submitImage)
      .subscribe((user) => {
        this.user.image = user.image;
        this.notificationService.showMessage('Change image successfully!');
      });
  }
}
