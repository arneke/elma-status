/* Copyright 2019 Arne Kepp, Licensed under MIT */
const got = require('got');

const DIFI_API = 'https://hotell.difi.no/api/jsonp/difi/elma/capabilities';
const JSONP = 'npmElmaStatus';

function validateOrgNumber(orgNumber) {
  if (!/^([\d]{9})$/.test(orgNumber)) {
    throw new Error('Organizational number must be 9 digits');
  }
}

function parseResponse(res) {
  var responseObject = JSON.parse(res.body.match(/^npmElmaStatus\((.*)\)\;$/)[1]);
  const entries = responseObject.entries.filter(({ ehf_invoice_2, ehf_invoice}) =>
    (ehf_invoice === 'true' || ehf_invoice_2 === 'true'));

  if(entries.length == 0) return false;
  return entries[0];
}

module.exports = function(organizationalNumber) {
  const orgNumber = `${organizationalNumber}`;
  validateOrgNumber(orgNumber);

  return got(DIFI_API, {
    searchParams: {
      query: orgNumber,
      callback: JSONP,
    }
  })
  .then(parseResponse);
}
