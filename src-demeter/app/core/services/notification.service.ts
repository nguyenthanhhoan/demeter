import { Injectable } from '@angular/core';

declare var $: any;
declare var Noty: any;

@Injectable()
export class NotificationService {

  constructor() {
  }

  showErrorMessage(msg) {
    new Noty({
      text: msg,
      type: 'error',
      timeout: 2000
    }).show();
  }

  showMessage(msg) {
    new Noty({
      text: msg,
      timeout: 2000
    }).show();
  }
}
