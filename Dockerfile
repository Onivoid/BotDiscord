FROM node:20
WORKDIR /usr/bot
COPY . .
RUN npm install -g typescript pm2 ts-node-dev tsc
RUN npm install
EXPOSE 1685
CMD [ "pm2-runtime", "start", "dist/index.js" ]