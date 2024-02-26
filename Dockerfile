FROM node:20
WORKDIR /usr/bot
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY . .
RUN npm run build
RUN pwd && ls -la dist
RUN node dist/index.js
EXPOSE 1685
#CMD [ "node", "dist/index.js" ]