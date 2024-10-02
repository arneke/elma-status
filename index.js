/* Copyright 2024 Arne Kepp, Licensed under MIT */
const got = require("got");

// urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1
const EHF_KEY = "poacc:billing";
const PEPPOL_API = "https://directory.peppol.eu/search/1.0/json";

function validateOrgNumber(orgNumber) {
  if (!/^([\d]{9})$/.test(orgNumber)) {
    throw new Error("Organizational number must be 9 digits");
  }
}

function parseResponse(body, key) {
  const { matches } = body;
  if (body.matches === undefined || matches.length !== 1) {
    return false;
    // throw new Error("Did not find organization in Peppol Directory.");
  }
  const [{ docTypes }] = matches;
  const docType = docTypes.find(({ value }) => {
    return value.includes(key);
  });

  return docType !== undefined && docType.value.includes("compliant");
}

module.exports = function (organizationalNumber, key = EHF_KEY) {
  const orgNumber = `${organizationalNumber}`;
  validateOrgNumber(orgNumber);
  return got(PEPPOL_API, {
    searchParams: {
      q: orgNumber,
      country: "NO",
    },
    responseType: "json",
    resolveBodyOnly: true,
  }).then((body) => parseResponse(body, key));
};
