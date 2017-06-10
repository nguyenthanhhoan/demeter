var winston = require('winston');

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'debug.log' })
  ]
});

winston.level = 'debug';
module.exports = winston;
