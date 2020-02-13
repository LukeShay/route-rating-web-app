FROM node:12-alpine

WORKDIR /app
COPY . .

EXPOSE 80

RUN apk add --no-cache bash
RUN chmod 755 scripts/*

RUN yarn --disable-progress
RUN yarn build --disable-progress
RUN yarn global add serve --disable-progress

RUN rm -rf node_modules

ENTRYPOINT ./scripts/run.sh