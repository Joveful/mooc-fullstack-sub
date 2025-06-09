FROM node:20-bullseye-slim

ENV DOCKER_CONTAINER true
WORKDIR /usr/src/app

COPY . .

RUN npm i

CMD [ "npm", "run", "dev", "--", "--host" ]
