FROM node:12.19.0-stretch as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --loglevel verbose

COPY public public
COPY src src
COPY --chown=node:node src src
COPY --chown=node:node public public

USER node
ENV NODE_ENV release
RUN npm run build

FROM nginx:1.18-alpine

COPY --from=builder /home/node/app/build /usr/share/nginx/html/mailpy
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
