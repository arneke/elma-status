const ehfCheck = require("./index");

test("Check that 994353136 / Kepp Software cannot receive EHF", async () => {
  const res = await ehfCheck("994353136");
  expect(res).toEqual(false);
});

test("Check that 965308865 / Smallworld Nordic can receive EHF", async () => {
  const res = await ehfCheck("965308865");
  expect(res).toEqual(true);
});
