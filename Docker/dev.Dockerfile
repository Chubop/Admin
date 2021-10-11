FROM node:latest

# Installing GCloud SDK
RUN apt-get update
RUN apt-get install python -y
RUN apt-get install -y curl && curl -sSL https://sdk.cloud.google.com | bash
ENV PATH="$PATH:/root/google-cloud-sdk/bin"
RUN gcloud components install app-engine-python
RUN gcloud components install app-engine-python-extras

RUN mkdir /marlonadmin
WORKDIR /marlonadmin
COPY package*.json ./
ADD . /marlonadmin/
RUN npm install

EXPOSE 3001
CMD ["npm", "start"]