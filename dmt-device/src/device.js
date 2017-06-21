var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var device = awsIot.device({
   keyPath: 'certs/cf637a6743.private.key',
  certPath: 'certs/cf637a6743.cert.pem',
    caPath: 'certs/root-CA.pem',
  clientId: 'RGBLedLamp',
    region: 'us-west-2'
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    console.log('connect');
  });

device
  .on('close', function() {
      console.log('close');
  });
device
  .on('reconnect', function() {
      console.log('reconnect');
  });
device
  .on('offline', function() {
      console.log('offline');
  });
device
  .on('error', function(error) {
      console.log('error', error);
  });
device
  .on('message', function(topic, payload) {
      console.log('message', topic, payload.toString());
  });

// setInterval(function() {
//   device.publish('topic_2', JSON.stringify({ message: 'Hello from device' }));
// }, 5000);