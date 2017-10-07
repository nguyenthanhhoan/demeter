import { AppSettings } from './app.settings';

declare var moment: any;

export class AppUtils {

  public static getSubmitDate(date) {
    let dateObj = moment(date, AppSettings.date_time_format.date);
    let submitDate = dateObj.format(AppSettings.date_time_format.date_iso);
    return submitDate;
  }

  /**
   * Convert a string datetime into { date: '', time: ''}
   * @param timeInStr time in iso8601 format
   */
  public static convertDateTimeFromIso8601Format(timeInStr) {
    let dateObj = moment.utc(timeInStr);
    return {
      date: dateObj.format(AppSettings.date_time_format.date),
      time: dateObj.format(AppSettings.date_time_format.time),
    };
  }

  /**
   * Convert a string datetime into { date: '', time: ''}
   * @param timeInStr time in iso8601 format
   */
  public static convertDateTimeToIso8601Format(dateObj) {
    let dateTimeInStr = dateObj.date + ' ' + dateObj.time;
    let dateTime = moment(dateTimeInStr, AppSettings.date_time_format.date_time, true);
    if (dateTime.isValid()) {
      return dateTime.format(AppSettings.date_time_format.date_time_iso);
    }
  }
}
