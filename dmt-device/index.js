let winston = require('./src/winston');
let websocket = require('./src/websocket');
let shadow = require('./src/shadow');
let restService = require('./src/rest-service');

let thingShadowOpts = {
  keyPath: './certs/95a7afd98e-private.pem.key',
  certPath: './certs/95a7afd98e-certificate.pem.crt',
  caPath: './certs/root-CA.pem',
  region: 'us-west-2',
  host: 'a31slpql5dmbn0.iot.us-west-2.amazonaws.com',
}

let appOpts = {
  web_hook: {
    // web_hook_api: 'http://console.demeter.local/',
    web_hook_api: 'http://web:8080/',
    update_device_value_path: 'webhook/update_device_value'
  },
  access_token: '07f0f540-0e56-4e2b-a4ef-b154ed7a53ff'
}

restService.init(appOpts);

shadow.init(thingShadowOpts, ['cdf-gateway', 'dmt-client', 'RGBLedLamp'], websocket, restService);

/*
 *
 * Client code to subcribe socket

    var ws = new WebSocket('ws://localhost:9090');
    ws.onopen = function () {
      ws.send(JSON.stringify({ 
        topic: 'REGISTER', clientId: 'UUID', 
        devices: [{
          gateway: 'cdf-gateway',
          fieldId: 'field1'
        }, {
          gateway: 'cdf-gateway',
          fieldId: 'field2'
        }]
      }));
    };

    ws.onmessage = function() {
      console.log('Message from server', event.data);
    };
 */