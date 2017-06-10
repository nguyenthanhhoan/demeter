var winston = require('./winston');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 9090 });

var cacheConnects = [];

wss.on('connection', (ws) => {
  ws.on('message', function incoming(message) {
    let msgObj = JSON.parse(message);
    if (msgObj.topic === 'REGISTER') {
      winston.log('debug', '[WebSocket] Receive register message: ' + message);

      cacheConnects.push({
        ws: ws,
        clientId: msgObj.clientId,

        /*
          Device Schema: {
            gateway: 'cdf-gateway',
            fieldId: 'field1'
          }
         */
        devices: msgObj.devices
      });
      winston.log('debug', '[WebSocket] Receive new connection. Current connected clients: ' + cacheConnects.length);
    } else {
      winston.log('debug', '[WebSocket] Topic not present or not supported yet: ' + message);
    }
  });

  ws.isAlive = true;
  ws.on('pong', heartbeat);
});


function heartbeat() {
  this.isAlive = true;
}

const interval = setInterval(function ping() {
  cacheConnects.forEach((cacheConnect, index) => {
    let ws = cacheConnect.ws;
    if (ws.isAlive === false) {
      winston.log('debug', '[WebSocket] Terminate not alive connection with clientId: ', cacheConnect.clientId);
      cacheConnects.splice(index, 1);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 30000);

var findDevice = function(cacheConnect, gateway, fieldId) {
  let foundDevice = cacheConnect.devices.find((device) => {
    return (device.gateway == gateway && device.fieldId == fieldId);
  });
  return foundDevice;
}

var notifySubcriber = function(gateway, field, value) {
  winston.log('debug', `[WebSocket] NotifySubcriber: gateway = ${gateway}, field = ${field}, value = ${value}`);
  winston.log('debug', `[WebSocket] Number of connected sockets: ${cacheConnects.length}`);
  cacheConnects.forEach((cacheConnect) => {
    let foundDevice = findDevice(cacheConnect, gateway, field);
    if (foundDevice) {
      let sentData = JSON.stringify({
        gateway: gateway,
        field: field,
        value: value
      });
      winston.log('debug', `[WebSocket] Prepare to send device data: ${sentData} to clientId: ${cacheConnect.clientId}`);
      cacheConnect.ws.send(sentData, function(error) {
          if (error) {
            console.log('error', error);
            winston.log('error', `[WebSocket] Cannot send data to clientId: ${cacheConnect.clientId}`);
          }
      });
    }
  });
}

module.exports.notifySubcriber = notifySubcriber;