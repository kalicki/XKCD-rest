FROM node:latest

WORKDIR /usr/src/app

ENV PORT=3080

COPY package.json .

RUN yarn install

COPY . .

EXPOSE $PORT

RUN node -v

CMD ["yarn","start"]