const awsIot = require('aws-iot-device-sdk');
const winston = require('./winston');
const isUndefined = require('./util').isUndefined;

// List fields need to debug
// let debugFields = ['field11', 'field12'];
const debugFields = [];
const debugThingNames = [];

/**
 * List of thingShadows connection.
 * Each connection hold a fixed number of things (ex. 5)
 * Need to group 5 thing into a connection to overcome limitation of AWS IoT
 * that can only allow maximum number of subscriptions per session is 50
 * See more: https://github.com/aws/aws-iot-device-sdk-js/issues/43
 * [{
     connected: false,
     thingShadow: {},
     clientId: 'group1',
     thingNames: []
    }]
 **/
let thingShadowConnections = [];
const maxThingPerGroup = 5;

let websocket, restService, thingShadowOpts;

//TODO: Need to persist this cache data
/**
 * Store data related to a thing (thing is a mapping with Demeter's package).
 * {key} is thingName (package name, device name)
 * {value}: {reported, registered}
 * @summary Cache reported data synced from AWS IoT, registered, timestamp of last connected
 * @member {Object}
 */
let cachedThingHash = {};

function registerThing(thingName, thingShadows) {

    thingShadows.register(thingName, {}, (err, failedTopics) => {
        if (isUndefined(err) && isUndefined(failedTopics)) {
            winston.log('info', `[AWS_ThingShadow] Thing ${thingName} registered!`);
            cachedThingHash[thingName] = {
                registered: true
            };

            // After registed, call get method to get current reported state
            // callback `update` will be triggered
            thingShadows.get(thingName);
        } else {
            winston.log('error', `[AWS_ThingShadow] Error when register ${thingName} thing shadow`);
        }
    });
}

function registerThings(connection) {
    const {thingNames, thingShadows} = connection;
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
        if (field === 'connected') {
            websocket.notifySubcriber(thingName, 'connected', reported['connected'], timestamp);
        } else {
            // Notify web api via websocket
            websocket.notifySubcriber(thingName, field, reported[field].value, timestamp);
            // Update to db via webhook
            restService.update_device_value(thingName, field, reported[field].value, timestamp);
        }
    });
}

/**
 * Notify to those subcribe the topic REGISTER_GATEWAY
 */
function notifyGatewaySubscriber(thingName, reported, timestamp) {
    websocket.notifyGatewaySubscriber(thingName, reported, timestamp);
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
      },
      "connected": 1
    }
  },
  "metadata": {
    "reported": {
      "field1": {
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
    if (isUndefined(cachedThingHash[thingName]) || isUndefined(cachedThingHash[thingName].reported)) {
        winston.log('debug', '[AWS_ThingShadow] cachedThingHash is empty, need sync all fields');
        syncFieldValue(fields, thingName, reported, timestamp);
        cachedThingHash[thingName] = cachedThingHash[thingName] || {};
        cachedThingHash[thingName].reported = reported;
        cachedThingHash[thingName].timestamp = timestamp;
    } else {
        let filteredFields = optimizeUpdateFields(fields, thingName, reported);
        if (filteredFields && filteredFields.length > 0) {
            winston.log('debug', `[AWS_ThingShadow] filteredFields = ${JSON.stringify(filteredFields)}`);
            syncFieldValue(filteredFields, thingName, reported, timestamp);
        }
    }
    notifyGatewaySubscriber(thingName, reported, timestamp);
}

/**
 * Filter out not updated field
 * @param {*} fields 
 */
function optimizeUpdateFields(fields, thingName, reported) {
    let cachedThingReport = cachedThingHash[thingName].reported;
    let shouldUpdateFields = fields.filter((field) => {
        if (typeof cachedThingReport[field] === 'undefined') {
            cachedThingReport[field] = reported[field];
            return field;
        } else if (field == 'connected') {
            if (cachedThingReport['connected'] != reported['connected']) {
                cachedThingReport['connected'] = reported['connected'];
                return field;
            }
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
    if (debugThingNames.indexOf(thingName) == -1) {
        return;
    }
    if (cachedThingHash[thingName] && cachedThingHash[thingName].reported) {
        let cachedThingReport = cachedThingHash[thingName].reported;
        winston.log('debug', 
            `[AWS_ThingShadow] debugThing ${thingName}: ` +
            `Cached value: ${JSON.stringify(cachedThingReport)}` +
            `Received value: ${JSON.stringify(reported)}`);
        debugFields.forEach(debugField => {
            if (cachedThingReport[debugField] && reported[debugField]) {
                winston.log('debug', 
                    `[AWS_ThingShadow] debugFields ${debugField}: ` +
                    `Cached value: ${cachedThingReport[debugField].value}. ` +
                    `Received value: ${reported[debugField].value}`);
            }
        });
    }
}

function subcribeGatewaySubject(appOpts) {
    appOpts.gatewaySubject.subscribe(
        (thingNames) => {
            if (thingNames && thingNames.length > 0) {
                updateThingShadowConnections(thingNames);
            }
        },
        (e) => {
            winston.log('debug', '[AWS_ThingShadow] gatewaySubject onError' + e.message);
        }
    );
}

/**
 * Filter out thingName newly added.
 * @param {[string]} thingNames 
 * @return {[string]} 
 */
function filterUnregisteredThingNames(thingNames) {
    let filtered = thingNames.filter(thingName => {
        return isUndefined(cachedThingHash[thingName]);
    });
    return filtered;
}

/**
 * Seperate thingNames into many connections.
 * @param {[string]} thingNames 
 */
function updateThingShadowConnections(thingNames) {
    const newThingNames = filterUnregisteredThingNames(thingNames);
    let connections = thingShadowConnections;
    newThingNames.forEach(thingName => {
        let length = connections.length;
        let lastConnection;
        if (length == 0) {
            lastConnection = connections[0];
        } else {
            lastConnection = connections[length - 1];
        }

        if (isUndefined(lastConnection) || lastConnection.thingNames.length >= maxThingPerGroup) {
            //this is the first group or reach max thing per group, need to create new group
            connections.push({
                connected: false,
                thingShadows: {},
                clientId: `group${connections.length + 1}`,
                thingNames: []
            })
        }
        length = connections.length;
        lastConnection = connections[length - 1];
        winston.log('debug', `[AWS_ThingShadow] updateThingShadowConnections add thingName=${thingName} into group${connections.length + 1}`);
        lastConnection.thingNames.push(thingName);
    });
    checkAndRegisterNewAddedThing();
}

function checkAndRegisterNewAddedThing() {
    const connections = thingShadowConnections;
    connections.forEach(connection => {
        if (!connection.connected) {
            initThingShadowConnection(connection);
        } else {
            const {thingNames, thingShadows} = connection;
            thingNames.forEach(thingName => {
                if (isUndefined(cachedThingHash[thingName])) {
                    registerThing(thingName, connection.thingShadows);
                }
            })
        }
    })
}

function processStatus(thingName, stat, clientToken, stateObject) {
    if (stateObject.state && stateObject.state.reported) {
        let {state} = stateObject;
        let {reported} = state;
        let {timestamp} = stateObject;
        cachedThingHash[thingName] = cachedThingHash[thingName] || {};
        cachedThingHash[thingName].reported = reported;
        cachedThingHash[thingName].timestamp = timestamp;
    } else {
        winston.log('debug', '[AWS_ThingShadow] processStatus received invalid stateObject' + JSON.stringify(stateObject));
    }
}

function initThingShadowConnection(connection) {
    winston.log('debug', `[AWS_ThingShadow] initThingShadowConnection with clientId=${connection.clientId} start to connect!`);
    connection.thingShadows = awsIot.thingShadow(Object.assign({}, thingShadowOpts, {clientId: connection.clientId}));
    const {thingShadows} = connection;
    thingShadows.on('connect', function() {
        winston.log('debug', `[AWS_ThingShadow] with clientId=${connection.clientId} connected`);
        connection.connected = true;
        registerThings(connection);
    });

    thingShadows.on('status',  processStatus);

    // Emitted when a different client's update or delete operation is accepted on the shadow.
    thingShadows.on('foreignStateChange',  function(thingName, operation, stateObject) {
        // This log only served for debugging purpose
        // winston.log('debug', '[AWS_ThingShadow] foreignStateChange ' + ' on ' + thingName + ': ' +
        // JSON.stringify(stateObject));
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
}

function syncGateways(gateways) {
    if (gateways && gateways.length > 0) {
        gateways.forEach(gateway => {
            if (gateway && gateway.length > 0 && cachedThingHash[gateway] && cachedThingHash[gateway].reported) {
                const { reported, timestamp } = cachedThingHash[gateway];
                notifyGatewaySubscriber(gateway, reported, timestamp);
            }
        })
    }
    
}

function init(thingShadowOptsObj, appOpts, websocketObj, restServiceObj) {
    websocket = websocketObj;
    restService = restServiceObj;
    thingShadowOpts = thingShadowOptsObj;

    subcribeGatewaySubject(appOpts);
}

module.exports = {
    init: init,
    syncGateways: syncGateways
}