FROM node:20-alpine

ENV NODE_ENV=production
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /app

COPY package.json ./
RUN pnpm install --prod --no-frozen-lockfile

COPY src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]
