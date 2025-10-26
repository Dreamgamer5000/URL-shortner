// tests/shorten.test.js
jest.setTimeout(20000);

const app = require("../app");
const request = require("supertest");
const waitForMongo = require("../utils/waitForMongo");
const mongoose = require("mongoose");

beforeAll(async () => {
  await waitForMongo();
});

describe("URL Shortener API Tests", () => {

  /**
   * TC01: POST /shorten - Valid URL
   * Sends a valid URL and expects a 200 OK status with shortUrl in response
   */
  test("TC01: POST /shorten returns a shortUrl for valid input", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ url: "https://example.com" });

    expect(res.status).toBe(200);
    expect(res.body.shortUrl).toBeDefined();
  });

  /**
   * TC02: POST /shorten - Missing URL
   * Sends an empty request body expecting 400 Bad Request with error message
   */
  test("TC02: POST /shorten returns 400 for missing URL", async () => {
    const res = await request(app).post("/shorten").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("URL is required");
  });

  /**
   * TC03: GET /:shortId - Redirect
   * Creates a short URL, then requests GET /:shortId expecting 302 redirection to original URL
   */
  test("TC03: GET /:shortId redirects to original URL", async () => {
    // First create a short URL
    const createRes = await request(app)
      .post("/shorten")
      .send({ url: "https://vit.ac.in" });

    // Extract short code from response
    const shortUrl = createRes.body.shortUrl.split("/").pop();

    // Send GET request to shortened URL endpoint
    const res = await request(app).get(`/${shortUrl}`);

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("https://vit.ac.in");
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});
