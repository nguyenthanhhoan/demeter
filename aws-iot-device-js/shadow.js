var awsIot = require('aws-iot-device-sdk');
var websocket = require('./websocket');

var thingShadows = awsIot.thingShadow({
  keyPath: 'certs/cf637a6743.private.key',
  certPath: 'certs/cf637a6743.cert.pem',
  caPath: 'certs/root-CA.pem',
  region: 'us-west-2',
  host: 'a31slpql5dmbn0.iot.us-west-2.amazonaws.com',
});

//
// Client token value returned from thingShadows.update() operation
//
var clientTokenUpdate;

//
// Simulated device values
//
var rval = 187;
var gval = 114;
var bval = 222;

thingShadows.on('connect', function() {
    console.log('connected!');
    thingShadows.register( 'test-1', function() {
      console.log('thing registered!');
    });

thingShadows.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('delta', 
    function(thingName, stateObject) {
        websocket.notifySubcriber(thingName);
        websocket.notifySubcriber(JSON.stringify(stateObject));
        console.log('received delta on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken);
    });

});