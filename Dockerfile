FROM node:12.19.0-stretch

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .
COPY --chown=node:node . .

USER node
ENV NODE_ENV release
CMD ["npm", "run", "start"]
