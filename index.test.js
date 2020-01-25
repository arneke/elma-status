const ehfCheck = require('./index');

test('Check that 958381492 / Akershus Fylkeskommune can receive EHF', async () => {
  const res = await ehfCheck('958381492');
  expect(res).toEqual({
    identifier: '958381492',
    peppolbis_creditnote: 'false',
    ehf_catalogue: 'false',
    peppolbis_creditnote_2: 'false',
    ICD: '9908',
    ehf_invoice: 'false',
    ehf_invoice_2: 'true',
    ehf_catalogue_1: 'false',
    ehf_creditnote: 'false',
    peppolbis_order_2: 'false',
    ehf_order: 'false',
    ehf_order_1: 'false',
    name: 'AKERSHUS FYLKESKOMMUNE',
    ehf_creditnote_2: 'true',
    peppolbis_invoice: 'false',
    peppolbis_order: 'false',
    peppolbis_invoice_2: 'true',
  });
});

test('Check that 994353136 / Kepp Software cannot receive EHF', async () => {
  const res = await ehfCheck('994353136');
  expect(res).toEqual(false);
});
