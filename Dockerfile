FROM node:latest

RUN npm install -g nodemon forever

COPY . app

WORKDIR /app

RUN npm install

RUN npm install --prefix client

RUN npm run build

EXPOSE 3000

CMD [ "node", "server.js" ]
