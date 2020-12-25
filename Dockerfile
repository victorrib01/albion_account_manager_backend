FROM node:11

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

ENV NODE_ENV=production

# Copying source files

COPY ./package*.json ./
COPY ./yarn.lock ./

# RUN rm -rf ./node_modules

RUN yarn global add typeorm

RUN yarn global add pm2

# Installing dependencies
RUN yarn install

COPY ./ ./

# Building app
RUN yarn tsc

EXPOSE 4000

CMD [ "yarn", "run", "serve"]
