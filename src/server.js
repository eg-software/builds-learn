const { createApp } = require("./app");

const port = Number(process.env.PORT) || 3000;
const app = createApp();

app.listen(port, () => {
  // Intentionally log something simple for CI logs
  console.log(`listening on http://localhost:${port}`);
});

