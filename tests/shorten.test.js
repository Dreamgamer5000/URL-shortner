jest.setTimeout(20000); // Give enough time for Mongo to connect

const app = require("../app");
const request = require("supertest");
const waitForMongo = require("../utils/waitForMongo");

beforeAll(async () => {
  await waitForMongo();
});

test("POST /shorten returns a shortUrl", async () => {
  const res = await request(app).post("/shorten").send({ url: "https://example.com" });

  console.log("Status:", res.status);
  console.log("Response body:", res.body);

  expect(res.status).toBe(200);
  expect(res.body.shortUrl).toBeDefined();
});
