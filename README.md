# URL Shortener Service

## Описание
Сервис для сокращения ссылок, предоставляющий следующие функции:
- Генерация коротких ссылок.
- Установка лимита переходов.
- Ограничение времени жизни ссылки.
- Уведомление пользователя об истечении срока действия ссылки или превышении лимита переходов.
- Идентификация пользователя по UUID.

## Структура проекта
- **backend**: Серверная часть на Node.js.
- **frontend**: Клиентская часть для взаимодействия с пользователем.
- **nginx**: Конфигурация веб-сервера.
- **docker-compose.yml**: Конфигурация для запуска всех компонентов через Docker.

## Запуск проекта
### Локально
1. Убедитесь, что установлен Docker и Docker Compose.
2. Клонируйте репозиторий:
   ```bash
   git clone git@github.com:Xrever21/url_shortener.git
   cd url_shortener

