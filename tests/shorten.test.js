const request = require("supertest");
const app = require("../app");

test("POST /shorten", async () => {
  const res = await request(app).post("/shorten").send({ url: "https://example.com" });
  expect(res.body.shortUrl).toBeDefined();
});
