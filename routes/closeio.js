'use strict';
var _ = require('lodash');
var auth = require('../services/auth');
var CloseioLeadsGetter = require('../services/closeio-leads-getter');
var CloseioLeadGetter = require('../services/closeio-lead-getter');
var CloseioLeadsSerializer = require('../serializers/closeio-leads');

module.exports = function (app, model, Implementation, opts) {
  var modelName = Implementation.getModelName(model);

  function closeioLeads(req, res, next) {
    new CloseioLeadsGetter(Implementation, _.extend(req.query,
      req.params), opts)
      .perform()
      .then(function (results) {
        var count = results[0];
        var leads = results[1];

        return new CloseioLeadsSerializer(leads, modelName, {
          count: count
        });
      })
      .then(function (leads) {
        res.send(leads);
      });
  }

  function lead(req, res, next) {
    new CloseioLeadGetter(Implementation, _.extend(req.query,
      req.params), opts)
      .perform()
      .then(function (lead) {
        return new CloseioLeadsSerializer(lead, modelName);
      })
      .then(function (lead) {
        res.send(lead);
      });
  }

  this.perform = function () {
    app.get('/forest/closeio_leads', auth.ensureAuthenticated, closeioLeads);

    app.get('/forest/' + modelName + '/:recordId/closeio_lead',
      auth.ensureAuthenticated, lead);
  };
};

