'use strict';
var _ = require('lodash');
var auth = require('../services/auth');
var CloseioLeadsGetter = require('../services/closeio-leads-getter');
var CloseioLeadGetter = require('../services/closeio-lead-getter');
var CloseioLeadEmailsGetter = require('../services/closeio-lead-emails-getter');
var CloseioCustomerLeadGetter = require('../services/closeio-customer-lead-getter');
var CloseioLeadsSerializer = require('../serializers/closeio-leads');
var CloseioLeadEmailsSerializer = require('../serializers/closeio-lead-emails');

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

  function closeioLead(req, res, next) {
    new CloseioLeadGetter(Implementation, _.extend(req.query, req.params), opts)
      .perform()
      .then(function (lead) {
        return new CloseioLeadsSerializer(lead, modelName);
      })
      .then(function (lead) {
        res.send(lead);
      });
  }

  function closeioLeadEmails(req, res, next) {
    new CloseioLeadEmailsGetter(Implementation,
      _.extend(req.query, req.params), opts)
      .perform()
      .then(function (results) {
        var count = results[0];
        var emails = results[1];

        return new CloseioLeadEmailsSerializer(emails, modelName, {
          count: count
        });
      })
      .then(function (emails) {
        res.send(emails);
      });
  }

  function customerLead(req, res, next) {
    new CloseioCustomerLeadGetter(Implementation, _.extend(req.query,
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

    app.get('/forest/closeio_leads/:leadId', auth.ensureAuthenticated,
      closeioLead);

    app.get('/forest/closeio_leads/:leadId/emails', auth.ensureAuthenticated,
      closeioLeadEmails);

    app.get('/forest/' + modelName + '/:recordId/closeio_lead',
      auth.ensureAuthenticated, customerLead);
  };
};
