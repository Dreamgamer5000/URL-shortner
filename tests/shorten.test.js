jest.setTimeout(15000); // 15 seconds, do this at the top of the file

const app = require("../app");
const request = require("supertest");

test("POST /shorten", async () => {
  const res = await request(app).post("/shorten").send({ url: "https://example.com" });
  expect(res.body.shortUrl).toBeDefined();
});
