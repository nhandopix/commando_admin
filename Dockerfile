FROM node:8
MAINTAINER ABC

ARG VERSION=1.0.0
ARG REACT_APP_API_URL=""

# Install packages
RUN npm install -g serve@9.1.0

# Install dependencies
WORKDIR /app

ADD package.json /app
ADD yarn.lock /app

RUN yarn cache clean
RUN yarn install --network-timeout 1000000 --silent --ignore-engines

# Copy source to docker
ADD . /app

# Build the app (optimize for production use)
RUN npm run build

# Serve static file in build folder
CMD yarn serve
