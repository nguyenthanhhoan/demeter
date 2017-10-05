export class NavigationButtonModel {
  id: string;
  icon: string;
  iconActive: string;
  iconGrey: string;
  title: string;
  url: string;
  constructor(obj: any) {
    this.id         = obj && obj.id         || null;
    this.icon       = obj && obj.icon       || null;
    this.iconActive = obj && obj.iconActive || null;
    this.iconGrey   = obj && obj.iconGrey   || null;
    this.title      = obj && obj.title      || '';
    this.url        = obj && obj.url        || '';
  }
}
