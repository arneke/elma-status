const ehfCheck = require('./index');

test('Check that 958381492 / Akershus Fylkeskommune can receive EHF', async () => {
  const res = await ehfCheck('958381492');
  expect(res).toEqual({
    identifier: '958381492',
    peppolbis_creditnote: 'true',
    ehf_catalogue: 'true',
    peppolbis_creditnote_2: 'true',
    ICD: '9908',
    ehf_invoice: 'true',
    ehf_invoice_2: 'true',
    ehf_catalogue_1: 'true',
    ehf_creditnote: 'true',
    peppolbis_order_2: 'false',
    ehf_order: 'false',
    ehf_order_1: 'false',
    name: 'AKERSHUS FYLKESKOMMUNE',
    ehf_creditnote_2: 'true',
    peppolbis_invoice: 'true',
    peppolbis_order: 'false',
    peppolbis_invoice_2: 'true',
  });
});

test('Check that 994353136 / Kepp Software cannot receive EHF', async () => {
  const res = await ehfCheck('994353136');
  expect(res).toEqual(false);
});
