FROM mysql:latest

ENV MYSQL_USER root
ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_DATABASE atom
ENV MYSQL_HOST 172.18.0.3

COPY ./server/db/schema.sql /docker-entrypoint-initdb.d