FROM node:18.18.2-alpine

WORKDIR /usr/src/app

COPY build ./build

COPY .env .

COPY package.json package-lock.json ./

COPY public ./public

RUN npm install

CMD if [ "$NODE_ENV" = "production" ]; then npm run start; elif [ "$NODE_ENV" = "development" ]; then npm run start; else echo 'Unknown NODE_ENV value'; fi