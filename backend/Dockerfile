FROM node:16-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm rebuild better-sqlite3

COPY . .

EXPOSE 3002

CMD ["node", "server.js"]

