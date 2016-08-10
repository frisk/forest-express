'use strict';
var P = require('bluebird');
var useragent = require('useragent');

function CloseioLeadGetter(Implementation, params, opts) {
  var userModel = null;
  var Closeio = opts.integrations.closeio.closeio;
  var closeio = new Closeio(opts.integrations.closeio.apiKey);

  this.perform = function () {
    var userCollectionName = opts.integrations.closeio.userCollection;
    userModel = Implementation.getModels()[userCollectionName];

    return Implementation.Closeio.getCustomer(userModel, params.recordId)
      .then(function (customer) {
        if (!customer) { return { data: [] }; }

        return closeio._get('/lead?query=email_address=' + customer.email);
      })
      .then(function (response) {
        return response.data[0];
      });
  };
}

module.exports = CloseioLeadGetter;
