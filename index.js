/* Copyright 2020 Arne Kepp, Licensed under MIT */
const got = require('got');

const EHF_KEY = 'PEPPOLBIS_3_0_BILLING_01_UBL';
const DIFI_API = 'https://hotell.difi.no/api/json/difi/elma/participants';

function validateOrgNumber(orgNumber) {
  if (!/^([\d]{9})$/.test(orgNumber)) {
    throw new Error('Organizational number must be 9 digits');
  }
}

function parseResponse(body, key) {
  const entries = body.entries.filter((entry) => {
    const ehfKey = entry[key];
    if (ehfKey === undefined) throw new Error('Response format from DiFI was unexpected, key was not present.');
    return (ehfKey === 'Ja');
  });
  if(entries.length == 0) return false;
  return entries[0];
}

module.exports = function(organizationalNumber, key = EHF_KEY) {
  const orgNumber = `${organizationalNumber}`;
  validateOrgNumber(orgNumber);

  return got(DIFI_API, {
    searchParams: {
      query: orgNumber,
      page: '1',
    },
    responseType: 'json',
    resolveBodyOnly: true
  })
  .then((body) => parseResponse(body, key));
}
