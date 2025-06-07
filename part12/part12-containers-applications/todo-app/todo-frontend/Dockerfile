FROM node:20-bullseye-slim

ENV VITE_BACKEND_URL=http://localhost:3000
WORKDIR /usr/src/app

COPY . .

RUN npm i
RUN npm run build
RUN npm i -g serve

CMD [ "serve", "dist" ]
