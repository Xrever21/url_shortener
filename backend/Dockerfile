# Используем образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Открываем порт
EXPOSE 3002

# Запускаем сервер
CMD ["node", "server.js"]
