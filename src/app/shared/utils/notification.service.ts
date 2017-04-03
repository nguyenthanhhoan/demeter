import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() {
  }

  smallBox(data, cb?) {
    $.smallBox(data, cb)
  }

  bigBox(data, cb?) {
    $.bigBox(data, cb)
  }

  smartMessageBox(data, cb?) {
    $.SmartMessageBox(data, cb)
  }

  confirmBox(options, cb?) {
    this.smartMessageBox({
      title: "Confirm!",
      content: options.content,
      buttons: '[OK][Cancel]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "OK") {
        cb();
      }
    });
  }

}
