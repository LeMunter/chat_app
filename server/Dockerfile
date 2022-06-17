FROM node:alpine

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

# Defaults to production, override in pipeline.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# CMD npm run $NODE_ENV
ENTRYPOINT npm run $NODE_ENV
