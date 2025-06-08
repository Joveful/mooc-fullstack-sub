FROM node:20-bullseye-slim AS base

ENV VITE_BACKEND_URL=http://localhost:3000
WORKDIR /usr/src/app

FROM base AS test

COPY . .

RUN npm i
RUN npm run test

FROM base AS prod
COPY . .

RUN npm i
RUN npm run build
RUN npm i -g serve

CMD [ "serve", "dist" ]
