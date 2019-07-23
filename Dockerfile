# Download base image nodejs
FROM node:10-alpine

RUN apk add --update \
    alpine-sdk

ENV HOME=/app

WORKDIR $HOME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

# Set port and start service
EXPOSE 5000

CMD [ "yarn", "start" ]