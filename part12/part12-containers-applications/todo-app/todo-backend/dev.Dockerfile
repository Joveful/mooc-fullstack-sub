FROM node:20-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm i

CMD [ "npm", "run", "dev", "--", "--host" ]
