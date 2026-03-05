const request = require("supertest");
const { createApp } = require("../src/app");

describe("service endpoints", () => {
  test("GET /health returns ok", async () => {
    const app = createApp();
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /api/echo echoes msg", async () => {
    const app = createApp();
    const res = await request(app).get("/api/echo").query({ msg: "hello" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ echo: "hello" });
  });

  test("POST /api/sum sums numbers", async () => {
    const app = createApp();
    const res = await request(app).post("/api/sum").send({ a: 2, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ sum: 5 });
  });

  test("POST /api/sum validates input", async () => {
    const app = createApp();
    const res = await request(app).post("/api/sum").send({ a: "nope", b: 3 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/numeric/i);
  });

  test("Invalid JSON returns 400", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/sum")
      .set("Content-Type", "application/json")
      .send("{bad json");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Invalid JSON." });
  });

  test("404 returns JSON error", async () => {
    const app = createApp();
    const res = await request(app).get("/nope");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });
});

