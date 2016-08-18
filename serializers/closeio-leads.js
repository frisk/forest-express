'use strict';
var _ = require('lodash');
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

function CloseioLeadsSerializer(attributes, customerCollectionName, meta) {

  if (_.isArray(attributes)) {
    attributes = attributes.map(function (attr) {
      attr.emails = [];
      return attr;
    });
  }

  return new JSONAPISerializer('closeio-leads', attributes, {
    attributes: ['url', 'created_by_name', 'display_name', 'status_label',
      'date_created', 'date_updated', 'description', 'emails'],
    emails: {
      ref: 'id',
      attributes: [],
      included: false,
      ignoreRelationshipData: true,
      relationshipLinks: {
        related: function (dataSet) {
          var ret = {
            href: '/forest/closeio_leads/' + dataSet.id + '/emails'
          };

          return ret;
        }
      }
    },
    keyForAttribute: function (key) { return key; },
    meta: meta
  });
}

module.exports = CloseioLeadsSerializer;
