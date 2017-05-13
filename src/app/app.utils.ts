import { AppSettings } from './app.settings';

declare var moment: any;

export class AppUtils {

  public static getSubmitDate(date) {
    let dateObj = moment(date, AppSettings.date_time_format.date);
    let submitDate = dateObj.format(AppSettings.date_time_format.date_iso);
    return submitDate;
  }
}
