FROM node:lts-alpine

USER root

WORKDIR /modmail
COPY package.json ./

RUN npm install -g npm@latest
RUN npm install --force

COPY . .
RUN npm run build

CMD ["node", "prod/index.js"]
