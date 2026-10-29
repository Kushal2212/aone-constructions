const test = require("node:test");
const assert = require("node:assert/strict");
const { parsePagination, pageResult } = require("../src/utils/pagination");

test("pagination applies safe defaults and calculates offsets", () => {
  assert.deepEqual(parsePagination({}), {
    page: 1, limit: 20, skip: 0, q: undefined, status: undefined,
  });
  assert.deepEqual(parsePagination({ page: "3", limit: "10", q: " house " }), {
    page: 3, limit: 10, skip: 20, q: "house", status: undefined,
  });
});

test("pagination rejects invalid page sizes", () => {
  assert.throws(() => parsePagination({ page: "0" }), /Too small/);
  assert.throws(() => parsePagination({ limit: "101" }), /Too big/);
});

test("collection response includes total pages", () => {
  assert.deepEqual(pageResult([{ id: "one" }], 21, 2, 20), {
    items: [{ id: "one" }],
    pagination: { page: 2, limit: 20, total: 21, pages: 2 },
  });
});
