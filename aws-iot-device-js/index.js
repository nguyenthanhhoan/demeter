let winston = require('./src/winston');
let websocket = require('./src/websocket');
let shadow = require('./src/shadow');

let thingShadowOpts = {
  keyPath: './certs/95a7afd98e-private.pem.key',
  certPath: './certs/95a7afd98e-certificate.pem.crt',
  caPath: './certs/root-CA.pem',
  region: 'us-west-2',
  host: 'a31slpql5dmbn0.iot.us-west-2.amazonaws.com',
}

shadow.init(thingShadowOpts, ['cdf-gateway', 'dmt-client', 'RGBLedLamp'], websocket);


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