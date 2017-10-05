/**
 * `require` can see global variable (Ex. jQuery)
 */
window['jQuery'] = require('jquery');
window['$'] = window['jQuery'];
window['moment'] = require('moment');
window['uuid'] = require('uuid/v4');
window['Noty'] = require('noty/lib/noty.min.js');
require('jquery-confirm');
