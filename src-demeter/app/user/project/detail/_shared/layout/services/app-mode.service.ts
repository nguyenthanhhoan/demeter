import { Injectable } from '@angular/core';
import { AppMode } from '../const/const';

@Injectable()
export class AppModeService {
  public getAppMode(): AppMode {
    let screenWidth = window.screen.width;
    if (screenWidth > 500) {
      return AppMode.DESKTOP;
    }
    return AppMode.MOBILE;
  }
}
