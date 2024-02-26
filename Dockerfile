FROM node:20
WORKDIR /usr/bot
COPY . .
RUN npm install
RUN npm install -g pm2 ts-node-dev tsc
EXPOSE 1685
CMD [ "pm2-runtime", "start", "dist/index.js" ]