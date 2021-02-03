FROM node:latest

RUN mkdir /marlonadmin
WORKDIR /marlonadmin
COPY package*.json ./
ADD . /marlonadmin/

RUN ls
RUN npm install

EXPOSE 3000