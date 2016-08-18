'use strict';
var _ = require('lodash');
var P = require('bluebird');
var useragent = require('useragent');

function CloseioLeadGetter(Implementation, params, opts) {
  var userModel = null;
  var Closeio = opts.integrations.closeio.closeio;
  var closeio = new Closeio(opts.integrations.closeio.apiKey);

  this.perform = function () {
    return closeio._get('/lead/' + params.leadId);
  };
}

module.exports = CloseioLeadGetter;
