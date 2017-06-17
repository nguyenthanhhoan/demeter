var awsIot = require('aws-iot-device-sdk');
var websocket = require('./websocket');
var winston = require('./winston');
var isUndefined = require('./util').isUndefined;

function registerThing(thingName, thingShadows) {

    thingShadows.register(thingName, (err, failedTopics) => {
        if (isUndefined(err) && isUndefined(failedTopics)) {
            winston.log('info', `[AWS_ThingShadow] Thing ${thingName} registered!`);
        } else {
            winston.log('error', `[AWS_ThingShadow] Error when register ${thingName} thing shadow`);
        }
    });
}

function registerThings(thingNames, thingShadows) {
    thingNames.forEach((thingName) => {
        registerThing(thingName, thingShadows);
    });
}

function processDelta(thingName, stateObject, websocket, restService) {

    let {state} = stateObject;
    let fields = Object.keys(state);

    fields.forEach((field) => {
        // Notify web api via websocket
        websocket.notifySubcriber(thingName, field, state[field].value);

        // Update to db via webhook
        restService.update_device_value(thingName, field, state[field].value);
    });
}

function init(thingShadowOpts, thingNames, websocket, restService) {

    var thingShadows = awsIot.thingShadow(thingShadowOpts);

    thingShadows.on('connect', function() {
        winston.log('debug', '[AWS_ThingShadow] connected');
        registerThings(thingNames, thingShadows);

        thingShadows.on('status',  function(thingName, stat, clientToken, stateObject) {
            winston.log('debug', '[AWS_ThingShadow] received ' + stat + ' on ' + thingName + ': ' +
                        JSON.stringify(stateObject));
        });

        thingShadows.on('delta', function(thingName, stateObject) {
            winston.log('debug', '[AWS_ThingShadow] received delta on ' + thingName + ': ' +
                        JSON.stringify(stateObject));

            processDelta(thingName, stateObject, websocket, restService);
        });

        thingShadows.on('timeout', function(thingName, clientToken) {
            winston.log('debug', 'received timeout on '+thingName+
                        ' with token: '+ clientToken);
            });
    });
}

module.exports.init = init;