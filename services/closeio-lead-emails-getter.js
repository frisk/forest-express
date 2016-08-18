'use strict';
var _ = require('lodash');
var P = require('bluebird');
var useragent = require('useragent');

function CloseioLeadEmailsGetter(Implementation, params, opts) {
  var userModel = null;
  var Closeio = opts.integrations.closeio.closeio;
  var closeio = new Closeio(opts.integrations.closeio.apiKey);

  this.perform = function () {
    return closeio._get('/activity/email/?lead_id=' + params.leadId)
      .then(function (results) {
        return [results.data.length, results.data];
      });
  };
}

module.exports = CloseioLeadEmailsGetter;
