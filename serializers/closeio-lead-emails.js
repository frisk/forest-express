'use strict';
var _ = require('lodash');
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

function CloseioLeadEmailsSerializer(attributes, customerCollectionName, meta) {

  return new JSONAPISerializer('closeio-lead-emails', attributes, {
    attributes: ['id', 'status', 'sender', 'subject', 'body_text'],
    keyForAttribute: function (key) { return key; },
    typeForAttribute: function () {
      return 'closeio-emails';
    },
    meta: meta
  });
}

module.exports = CloseioLeadEmailsSerializer;
