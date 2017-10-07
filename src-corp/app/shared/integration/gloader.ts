const url = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCJa0aFsarEEuWmHo-0emqlnLIU8hhRTd4&callback=__onGoogleLoaded'
export class GoogleAPI {
  loadAPI: Promise<any>;
  constructor(){
    this.loadAPI = new Promise((resolve) => {
      window['__onGoogleLoaded'] = (ev) => {
        console.log('google api loaded');
        resolve();
      };

      // TODO: Cannot handle two google instances
      if (typeof window['google'] === 'object' && typeof window['google'].maps === 'object') {
        console.log('google api already loaded');
        resolve();
      } else {
        console.log('prepare to load google map script');
        this.loadScript();
      }
    });
  }

  doSomethingGoogley(){
    return this.loadAPI.then((gapi) => {
      console.log(gapi);
    });
  }

  loadScript(){
    console.log('loading google api..');
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}