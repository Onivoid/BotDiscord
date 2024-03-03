FROM node:20
WORKDIR /usr/bot
COPY . .
RUN npm install
RUN npm install pm2 -g
RUN npm run build
CMD ["pm2-runtime", "start", "dist/index.js", "--watch"]
EXPOSE 1685