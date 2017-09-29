import { Subject } from 'rxjs/Rx';
import { AppSettings } from './app.settings';

declare var moment: any;
declare var Highcharts: any;
declare var System: any;

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

export function loadHighChart() {
  const broadcast = new Subject();
  System.import('script-loader!highcharts').then(() => {
    return System.import('script-loader!highcharts/highcharts.js');
  }).then(() => {
    Highcharts.setOptions({
      global : {
        useUTC : true,
        timezone: 'Asia/Ho_Chi_Minh'
      }
    });
    broadcast.next();
  });
  return broadcast;
};

export function buildHighChartModel(chartData) {
  let series = chartData.chart_series;
  let timestamps = chartData.timestamps;
  let start_timestamp = timestamps[0];
  let end_timestamp = timestamps[timestamps.length - 1];
  let pointInterval = Math.round((end_timestamp - start_timestamp) / series.data.length);
  let chartOpts = {
    chart: {
      backgroundColor: '#F5F3EB',
      type: 'spline'
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      },
      min: Math.round(Math.min(...series.data)) - 1,
      max: Math.round(Math.max(...series.data)) + 1
    },
    tooltip: {
      valueSuffix: series.valueSuffix
    },
    plotOptions: {
      spline: {
        pointInterval: pointInterval,
        pointStart: start_timestamp
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      }
    },
    series: [{
      name: series.name,
      valueSuffix: series.valueSuffix,
      data: [...series.data]
    }]
  };
  return chartOpts;
}
