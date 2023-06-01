FROM node:18-alpine

WORKDIR /usr/src

COPY src .
COPY openapi3_0.json .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

RUN yarn install
RUN yarn build
RUN mkdir db

EXPOSE 3000

CMD ["node", "dist/main.js"]
