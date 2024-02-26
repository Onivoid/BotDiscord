FROM node:20
WORKDIR /usr/bot
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 1685
CMD [ "pm2-runtime", "start", "dist/index.js" ]