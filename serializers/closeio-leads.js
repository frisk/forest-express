'use strict';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

function CloseioLeadsSerializer(attributes, customerCollectionName, meta) {
  return new JSONAPISerializer('closeio-leads', attributes, {
    attributes: ['url', 'created_by_name', 'display_name', 'status_label',
      'date_created', 'date_updated', 'description'],
    keyForAttribute: function (key) { return key; },
    meta: meta
  });
}

module.exports = CloseioLeadsSerializer;
