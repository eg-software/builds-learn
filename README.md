# builds-learn

Simple Node/Express service used to exercise GitHub Actions with real `pnpm install` + `pnpm test`.

## Run locally

```bash
pnpm install
pnpm lint
pnpm test
pnpm start
```

Service listens on `PORT` (defaults to 3000).

## Docker

```bash
docker build -t builds-learn-js-service .
docker run --rm -p 3000:3000 builds-learn-js-service
```

CI publishes reports to GitHub Pages:
- `/eslint/` for the ESLint HTML report
- `/coverage/` for the Jest coverage HTML report

## Endpoints

- `GET /health` → `{ "status": "ok" }`
- `GET /api/echo?msg=hello` → `{ "echo": "hello" }`
- `GET /api/time` → `{ "now": "<iso timestamp>" }`
- `POST /api/sum` body `{ "a": 2, "b": 3 }` → `{ "sum": 5 }`

