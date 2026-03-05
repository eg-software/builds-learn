const express = require("express");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/api/echo", (req, res) => {
    const msg = typeof req.query.msg === "string" ? req.query.msg : "";
    res.status(200).json({ echo: msg });
  });

  app.get("/api/time", (_req, res) => {
    res.status(200).json({ now: new Date().toISOString() });
  });

  app.post("/api/sum", (req, res) => {
    const { a, b } = req.body ?? {};
    const aNum = Number(a);
    const bNum = Number(b);

    if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
      return res
        .status(400)
        .json({ error: "Body must be JSON with numeric fields { a, b }." });
    }

    return res.status(200).json({ sum: aNum + bNum });
  });

  // Invalid JSON body
  app.use((err, _req, res, next) => {
    if (err && err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Invalid JSON." });
    }
    return next(err);
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

module.exports = { createApp };
