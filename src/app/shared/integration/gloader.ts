const url = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCJa0aFsarEEuWmHo-0emqlnLIU8hhRTd4&callback=__onGoogleLoaded'
export class GoogleAPI {
  loadAPI: Promise<any>
  constructor(){
    this.loadAPI = new Promise((resolve) => {
      window['__onGoogleLoaded'] = (ev) => {
        console.log('google api loaded');
        resolve();
      }
      this.loadScript()
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