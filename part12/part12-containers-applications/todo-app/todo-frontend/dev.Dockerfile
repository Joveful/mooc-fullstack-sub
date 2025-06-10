FROM node:20-bullseye-slim

#ENV VITE_BACKEND_URL=http://localhost:8080/api
WORKDIR /usr/src/app

COPY . .

RUN npm i

CMD [ "npm", "run", "dev", "--", "--host"]
