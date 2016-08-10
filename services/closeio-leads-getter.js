'use strict';
var _ = require('lodash');
var P = require('bluebird');
var useragent = require('useragent');

function CloseioLeadsGetter(Implementation, params, opts) {
  var userModel = null;
  var Closeio = opts.integrations.closeio.closeio;
  var closeio = new Closeio(opts.integrations.closeio.apiKey);

  function hasPagination() {
    return params.page && params.page.number;
  }

  function getLimit() {
    if (hasPagination()) {
      return params.page.size || 10;
    } else {
      return 10;
    }
  }

  function getOffset() {
    if (hasPagination()) {
      return (parseInt(params.page.number) - 1) * getLimit();
    } else {
      return 0;
    }
  }

  function parseSearch() {
    return '&query=' + encodeURIComponent('name:"' + params.search +
      '" or status:"' + params.search + '"');
  }

  function parseFilters() {
    var queryString = '';

    _.each(params.filter, function (value, key) {
      if (key === 'status_label') { key = 'status'; }

      if (queryString) {
        queryString += ' and ';
      }

      queryString += key + ':' + value;
    });

    return '&query=' + encodeURIComponent(queryString);
  }

  this.perform = function () {
    var url = '/lead?_limit=' + getLimit() + '&_skip=' +
      getOffset() + '&sort=-date_updated';

    if (params.search) {
      url += parseSearch()
    } else if (params.filter) {
      url += parseFilters();
    }

    return closeio._get(url)
      .then(function (response) {
        return [response.total_results, response.data];
      });
  };
}

module.exports = CloseioLeadsGetter;
