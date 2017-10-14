export class AppSettings {
  // Development
  // public static home_url = 'http://localhost:3000/';

  // Testing
  // public static api = 'http://family.demeter.local/';
  // public static home_url = 'http://family.demeter.local/';

  // Prodution
  public static api = 'http://family.demeter.vn/';
  public static home_url = location.protocol + '//family.demeter.vn/';

  public static websocketPath = `ws://${location.hostname}:9090`;
  public static role = {
    admin: {
      name: 'admin'
    },
    family_user: {
      name: 'family_user'
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

  public static validation = {
    email: /^[ ]*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+[ ]*$/
  };
}
