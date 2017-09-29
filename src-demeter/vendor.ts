/**
 * `require` can see global variable (Ex. jQuery)
 */
window['jQuery'] = require('jquery');
window['$'] = window['jQuery'];
window['moment'] = require('moment');
window['Noty'] = require('noty/lib/noty.min.js');
window['uuid'] = require('uuid/v4');
require('bootstrap/js/tooltip.js'); // required for summernote
require('bootstrap/js/modal.js'); // required for summernote
require('codemirror');
require('summernote/dist/summernote.js');
require('mediaelement/build/mediaelement-and-player.js');
require('moment-timezone');
require('jquery-confirm');
require('bootstrap-switch');
