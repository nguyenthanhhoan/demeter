var request = require('request-promise');
var winston = require('./winston');
var opts = {};

function buildReq(path, body) {
  return {
    uri: path,
    method: 'POST',
    body: body,
    qs: {
        access_token: opts.access_token
    },
    json: true
}
}

function init(appOpts) {
  opts = appOpts;
}

function update_device_value(gateway, field_id, value) {
  winston.log('info', `[Rest Service] Prepare to call webhook with [gateway=${gateway}], [field_id=${field_id}], [value=${value}]`);
  let update_path = opts.web_hook.web_hook_api + opts.web_hook.update_device_value_path;
  request(buildReq(update_path, {
    gateway: gateway,
    field_id: field_id,
    value: value
  }))
  .then(function () {
    winston.log('info', `[Rest Service] Request succeeded!`);
  })
  .catch(function (err) {
    winston.log('error', `[Rest Service] Request failed with msg: ` + err.message);
  });
}

module.exports.init = init;
module.exports.update_device_value = update_device_value;
