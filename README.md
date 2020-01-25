# elma-status

## Requirements
Requires Node 10.x due to dependency on `got`

## Usage
```
var elmaStatus = require('elma-status');

elmaStatus('991825827').then(status => {
  console.log(status);
});

```
## Response
```
{
  identifier: '991825827',
  peppolbis_creditnote: 'true',
  ehf_catalogue: 'false',
  peppolbis_creditnote_2: 'true',
  ICD: '9908',
  ehf_invoice: 'true',
  ehf_invoice_2: 'true',
  ehf_catalogue_1: 'false',
  ehf_creditnote: 'true',
  peppolbis_order_2: 'false',
  ehf_order: 'false',
  ehf_order_1: 'false',
  name: 'DIREKTORATET FOR FORVALTNING OG IKT',
  ehf_creditnote_2: 'true',
  peppolbis_invoice: 'true',
  peppolbis_order: 'false',
  peppolbis_invoice_2: 'true'
}
```
