FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --loglevel=warn

EXPOSE 8000

VOLUME ["/usr/src/app"]