/**
 * `require` can see global variable (Ex. jQuery)
 */
window['jQuery'] = require('jquery');
window['$'] = window['jQuery'];
window['moment'] = require('moment');
window['Noty'] = require('noty/lib/noty.min.js');
require('mediaelement/build/mediaelement-and-player.js');
require('moment-timezone');
// require('smartadmin-plugins/notification/SmartNotification.min.js');
