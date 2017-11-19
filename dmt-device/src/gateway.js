const winston = require('./winston');
const redis = require('redis');
const Rx = require('rx');

let cachedGateways = [];

const client = redis.createClient({
  host: 'redis'
});

client.on('error', function (err) {
  winston.log('error', `[Gateway Service] Redis error: ` + err.message);
  if (err) throw(err);
});

function gatewayShouldUpdate(oldGateways, newGateways) {
  let shouldUpdate = false;
  if (oldGateways.length !== newGateways.length) {
    winston.log('info', `[Gateway Service] received new gateways data with different length`);
    shouldUpdate = true;
  } else {
    oldGateways.forEach((oldGateway, index) => {
      if (oldGateway !== newGateways[index]) {
        winston.log('info', `[Gateway Service] ${oldGateway} gateway changed to ${newGateways[index]}`);
        shouldUpdate = true;
      }
    })
  }
  return shouldUpdate;
}

function getLatestGateway(subject) {
  client.get('gateways', function(err, reply) {
    if (err) {
      winston.log('error', `[Gateway Service] cannot getLatestGateway: ` + err.message);
    }
    if (reply && reply.length > 0) {
      let newGateways = JSON.parse(reply);
      if (gatewayShouldUpdate(cachedGateways, newGateways)) {
        cachedGateways = newGateways;
        subject.onNext(cachedGateways);
      }
    } else {
      winston.log('error', `Reply is not in correct format: [${reply}]`);
    }
  });
}


function init(appOpts) {
  const subject = new Rx.Subject();
  setInterval(() => {
    getLatestGateway(subject);
  }, 1000 * 5);
  appOpts.gatewaySubject = subject;
}

module.exports.init = init;
