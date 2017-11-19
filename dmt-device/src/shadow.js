const awsIot = require('aws-iot-device-sdk');
const winston = require('./winston');
const isUndefined = require('./util').isUndefined;
const Rx = require('rx');

// List fields need to debug
// let debugFields = ['field11', 'field12'];
let debugFields = ['field1', 'field3'];
let thingShadows;
let websocket, restService;
const shadowConnectedSubject = new Rx.Subject();

//TODO: Need to persist this cache data
let cachedReport = {};

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

/**
 * Call webservice to update field value to backend's db
 * Notify subcriber to update to Web UI
 */
function syncFieldValue(fields, thingName, reported, timestamp) {
    fields.forEach((field) => {
        // Notify web api via websocket
        websocket.notifySubcriber(thingName, field, reported[field].value, timestamp);

        // Update to db via webhook
        // TODO: Need to improve here, cached the previous state
        restService.update_device_value(thingName, field, reported[field].value, timestamp);
    });
}

/**
 * Received state changed event. Normally, this function get executed in the interval basic (5 secs)
 * To get lastest data for field (temp, humid, buld, ...)
 * @param {*} thingName 
 * @param {*} stateObject 
 */
function processForeignStateChange(thingName, stateObject) {
/*
{
  "state": {
    "reported": {
      "field1": {
        "value": 31.4
      },
      "field17": {
        "value": 0
      }
    }
  },
  "metadata": {
    "reported": {
      "field1": {
        "value": {
          "timestamp": 1503720372
        }
      },
      "field18": {
        "value": {
          "timestamp": 1503720372
        }
      }
    }
  },
  "timestamp": 1503720372
}
 */
    let {state} = stateObject;
    let {reported} = state;
    let {timestamp} = stateObject;
    debugFieldsFn(thingName, reported);
    let fields = Object.keys(reported);
    if (typeof cachedReport[thingName] === 'undefined') {
        winston.log('debug', '[AWS_ThingShadow] cachedReport is empty, need sync all fieldse');
        syncFieldValue(fields, thingName, reported, timestamp);
        cachedReport[thingName] = {
            reported: reported
        };
    } else {
        let filteredFields = optimizeUpdateFields(fields, thingName, reported);
        if (filteredFields && filteredFields.length > 0) {
            winston.log('debug', `[AWS_ThingShadow] filteredFields = ${JSON.stringify(filteredFields)}`);
            syncFieldValue(filteredFields, thingName, reported, timestamp);
        }
    }
}

/**
 * Filter out not updated field
 * @param {*} fields 
 */
function optimizeUpdateFields(fields, thingName, reported) {
    let cachedThingReport = cachedReport[thingName].reported;
    let shouldUpdateFields = fields.filter((field) => {
        if (typeof cachedThingReport[field] === 'undefined') {
            cachedThingReport[field] = reported[field];
            return field;
        } else if (cachedThingReport[field].value != reported[field].value) {
            cachedThingReport[field].value = reported[field].value;
            return field;
        }
    });
    return shouldUpdateFields;
}

/**
 * Log debug fields to log file
 * @param {*} thingName 
 * @param {*} reported 
 */
function debugFieldsFn(thingName, reported) {
    if (cachedReport[thingName]) {
        let cachedThingReport = cachedReport[thingName].reported;
        debugFields.forEach(debugField => {
            winston.log('debug', 
                `[AWS_ThingShadow] debugFields ${debugField}: ` +
                `Cached value: ${cachedThingReport[debugField].value}. ` +
                `Received value: ${reported[debugField].value}`);
        });
    }
}

function onThingNamesUpdated(thingNames) {
    winston.log('debug', '[AWS_ThingShadow] thingNames updated' + JSON.stringify(thingNames));
    registerThings(thingNames, thingShadows);
}

function subcribeGatewaySubject(appOpts) {
    shadowConnectedSubject.combineLatest(appOpts.gatewaySubject,
        (connected, thingNames) => thingNames)
    .subscribe(
        (thingNames) => {
            onThingNamesUpdated(thingNames);
        },
        (e) => {
            winston.log('debug', '[AWS_ThingShadow] subcribeGatewaySubject onError' + e.message);
        },
        () => {
            winston.log('debug', '[AWS_ThingShadow] subcribeGatewaySubject onCompleted' + e.message);
        }
    );
}

function init(thingShadowOpts, appOpts, websocketObj, restServiceObj) {
    websocket = websocketObj;
    restService = restServiceObj;
    thingShadows = awsIot.thingShadow(thingShadowOpts);
    subcribeGatewaySubject(appOpts);

    thingShadows.on('connect', function() {
        winston.log('debug', '[AWS_ThingShadow] connected');
        shadowConnectedSubject.onNext(true);

        thingShadows.on('status',  function(thingName, stat, clientToken, stateObject) {
            winston.log('debug', '[AWS_ThingShadow] received ' + stat + ' on ' + thingName + ': ' +
                        JSON.stringify(stateObject));
        });

        // Emitted when a different client's update or delete operation is accepted on the shadow.
        thingShadows.on('foreignStateChange',  function(thingName, operation, stateObject) {
            if (stateObject.state.reported) {
                processForeignStateChange(thingName, stateObject);
            } else {
                winston.log('debug', '[AWS_ThingShadow] foreignStateChange received invalid stateObject' + JSON.stringify(stateObject));
            }
        });

        thingShadows.on('timeout', function(thingName, clientToken) {
            winston.log('debug', 'received timeout on '+thingName+
                        ' with token: '+ clientToken);
            });
    });
}

module.exports.init = init;