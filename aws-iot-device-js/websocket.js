const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 });

var cacheConnects = [];

wss.on('connection', function connection(ws) {
  cacheConnects.push(ws);
});

var notifySubcriber = function(data) {
  console.log('num of connected ws', cacheConnects.length);
  cacheConnects.forEach(function(ws) {
    ws.send(data);
  });
}

module.exports.notifySubcriber = notifySubcriber;


// Client code
// var ws = new WebSocket('ws://localhost:9090');

// ws.onopen = function open() {
//   ws.send('something');
// };

// ws.onmessage = function incoming(data, flags) {
//   console.log(data.data);
// };