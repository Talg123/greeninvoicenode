FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /user/src/app

COPY package*.json ./

COPY . .
ENV IN_DOCKER=true

CMD ["npm", "start"]
