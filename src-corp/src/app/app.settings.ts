export class AppSettings {
  public static api = 'http://demeter.local/';
  // public static api = 'http://demeter.vn/';

  // public static home_url = 'http://localhost:3000/';
  public static home_url = 'http://demeter.local/';
  // public static home_url = location.protocol + '//demeter.vn/';

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
    date_time_iso: 'YYYY-MM-DDTHH:mm',
    date_time: 'MM/DD/YYYY HH:mm',
    time: 'HH:mm',
    date_picker_date_format: 'mm/dd/yy'
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

  public static validation = {
    email: /^[ ]*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+[ ]*$/
  };
}
