# stop script on error
set -e

# Check to see if root CA file exists, download if not
if [ ! -f ./root-CA.crt ]; then
  printf "\nDownloading AWS IoT Root CA certificate from Symantec...\n"
  curl https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem > root-CA.crt
fi

# install AWS Device SDK for NodeJS if not already installed
if [ ! -d ./node_modules ]; then
  printf "\nInstalling AWS SDK...\n"
  npm install aws-iot-device-sdk
fi

# run pub/sub sample app using certificates downloaded in package
printf "\nRuning pub/sub sample application...\n"

# node node_modules/aws-iot-device-sdk/examples/device-example.js --host-name=a31slpql5dmbn0.iot.us-west-2.amazonaws.com --private-key=certs-2/95a7afd98e-private.pem.key --client-certificate=certs-2/95a7afd98e-certificate.pem.crt --ca-certificate=certs-2/root-CA.pem

node node_modules/aws-iot-device-sdk/examples/thing-example.js --host-name=a31slpql5dmbn0.iot.us-west-2.amazonaws.com --private-key=certs-2/95a7afd98e-private.pem.key --client-certificate=certs-2/95a7afd98e-certificate.pem.crt --ca-certificate=certs-2/root-CA.pem --test-mode=2

#ode node_modules/aws-iot-device-sdk/examples/device-example.js --host-name=a31slpql5dmbn0.iot.us-west-2.amazonaws.com --private-key=su-test-device.private.key --client-certificate=su-test-device.cert.pem --ca-certificate=root-CA.crt --test-mode=1

#node node_modules/aws-iot-device-sdk/examples/thing-example.js --host-name=a31slpql5dmbn0.iot.us-west-2.amazonaws.com --private-key=su-test-device.private.key --client-certificate=su-test-device.cert.pem --ca-certificate=root-CA.crt --test-mode=1

#node node_modules/aws-iot-device-sdk/examples/thing-passthrough-example.js --host-name=a31slpql5dmbn0.iot.us-west-2.amazonaws.com --private-key=su-test-device.private.key --client-certificate=su-test-device.cert.pem --ca-certificate=root-CA.crt --test-mode=1

# node node_modules/aws-iot-device-sdk/examples/echo-example.js --host-name=a31slpql5dmbn0.iot.us-west-2.amazonaws.com --private-key=certs-2/95a7afd98e-private.pem.key --client-certificate=certs-2/95a7afd98e-certificate.pem.crt --ca-certificate=certs-2/root-CA.pem --thing-name suTestThing1


#node node_modules/aws-iot-device-sdk/examples/temperature-control/temperature-control.js --host-name=a31slpql5dmbn0.iot.us-west-2.amazonaws.com --private-key=su-test-device.private.key --client-certificate=su-test-device.cert.pem --ca-certificate=root-CA.crt --test-mode=1
#node examples/temperature-control/temperature-control.js -f ~/certs --test-mode=1


# Check list when testing this

# 1. Make sure certificate for device has been created
#     https://us-west-2.console.aws.amazon.com/iotv2/home?region=us-west-2#/thing/RGBLedLamp

# 2. Make sure certificate has been attached to thing
#     https://us-west-2.console.aws.amazon.com/iotv2/home?region=us-west-2#/policy/dmt-client-Policy