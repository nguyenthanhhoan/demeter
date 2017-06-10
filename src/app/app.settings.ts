export class AppSettings {
  public static api = location.hostname === 'localhost' ? 'http://console.demeter.local/' :
    location.protocol + '//' + location.hostname + '/';

  public static websocketPath = `ws://${location.hostname}:9090`;
  public static role = {
    admin: {
      name: 'admin'
    },
    user: {
      name: 'user'
    }
  };
  public static date_time_format = {
    date: 'MM/DD/YYYY',
    date_iso: 'YYYY-MM-DD',
    date_time: 'MM/DD/yyyy HH:mm',
    time: 'hh:mm A'
  };

  public static irrigationType = {
    watering: {
      name: 'watering',
      label: 'Watering'
    },
    watering_fertilizer: {
      name: 'watering_fertilizer',
      label: 'Watering & Fertilizer'
    }
  };
}
