#Layer 1
FROM node:latest AS builder
WORKDIR /app
COPY ./app/package*.json ./
RUN npm instal;
COPY ./app/ ./
RUN npm run build

#Layer 2
FROM debian:latest

RUN apt-get update && apt-get upgrade -y \
    apt-get install -y \
    mariadb-server \
    nginx \
    nodejs \
    npm \
    python3-pip \
    python3-vnv \ 
    && apt-get clean

RUN npm install -g pm2

RUN python3 -m venv /app/venv

RUN /app/venv/bin/pip install --upgrade pip && \
    /app/venv/bin/pip install python-dotenv mysql-connector-python

WORKDIR /app

## THIS IS FOR API
COPY ./api/index.js /app/
COPY ./api/package*.json /app/

COPY --from=builder ./app/dist /var/www/html
COPY ./default.conf /etc/nginx/sites-available/default
COPY ./database.sql /app/
COPY ./creaete_tables_db.py /app/

RUN echo "API_PORT = 3000">> /app/.env &&\
    echo "MARIADB_ROOT_PASSWORD = 123456">> /app/.env &&\
    echo "MARIADB_DATABASE-simple_calc_db">> /app/.env &&\ 
    echo "MARIADB_USER = simple">> /app/.env &&\ 
    echo "MARIADB_PASSWORD = 654321">> /app/.env 


EXPOSE 80

COPY entrypoint.sh /entrypoint.sh
#THIS WILL BE OUR ENTRYPOINT SCRIPT EXECUTABLE

RUN chmod +x /entrypoint.sh
#this will be execute

ENTRYPOINT [ "/entrypoint.sh" ]