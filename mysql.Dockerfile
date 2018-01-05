FROM mysql:latest

ENV MYSQL_USER root
ENV MYSQL_ROOT_PASSWORD secret
ENV MYSQL_DATABASE atom

COPY ./server/db/schema.sql /docker-entrypoint-initdb.d
# COPY ./data.sql /docker-entrypoint-initdb.d