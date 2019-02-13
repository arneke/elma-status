/* Copyright 2019 Arne Kepp, Licensed under MIT */
const axios = require('axios');

const DIFI_API = 'https://hotell.difi.no/api/jsonp/difi/elma/capabilities';
const JSONP = 'npmElmaStatus';

function validateOrgNumber(orgNumber) {
  if (!/^([\d]{9})$/.test(orgNumber)) {
    throw new Error('Organizational number must be 9 digits');
  }
}

function parseResponse(res) {
  var obj = JSON.parse(res.data.match(/^npmElmaStatus\((.*)\)\;$/)[1]);
  if(obj.entries.length == 0) return false;
  return obj.entries[0];
}

module.exports = function(organizationalNumber) {
  const orgNumber = new String(organizationalNumber);
  validateOrgNumber(orgNumber);

  return axios.get(DIFI_API, {
    params: {
      ehf_invoice: 'true',
      query: orgNumber,
      callback: JSONP,
    }
  })
  .then(parseResponse);
}
