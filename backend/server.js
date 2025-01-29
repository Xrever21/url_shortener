const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3002;
const db = new Database('database.db');

// Создание таблицы, если её нет
db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    longUrl TEXT NOT NULL,
    shortUrl TEXT NOT NULL,
    userUuid TEXT NOT NULL,
    clicks INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    expiresAt DATETIME DEFAULT (DATETIME('now', '+1 day'))
  );
`);

// Middleware
app.use(bodyParser.json());

// Генерация короткой ссылки
app.post('/shorten', (req, res) => {
  const { longUrl, uuid } = req.body;
  if (!longUrl || !uuid) return res.status(400).json({ error: 'URL и UUID обязательны.' });

  const shortId = uuidv4().slice(0, 8);
  const shortUrl = `http://kowmarket.ru/${shortId}`;

  const stmt = db.prepare("INSERT INTO links (id, longUrl, shortUrl, userUuid) VALUES (?, ?, ?, ?)");
  stmt.run(shortId, longUrl, shortUrl, uuid);

  res.json({ shortUrl });
});

// Перенаправление по короткой ссылке
app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const stmt = db.prepare("SELECT * FROM links WHERE id = ? AND expiresAt > DATETIME('now')");
  const link = stmt.get(shortId);

  if (!link) return res.status(404).send('Ссылка не найдена или срок действия истёк.');

  db.prepare("UPDATE links SET clicks = clicks + 1 WHERE id = ?").run(shortId);
  res.redirect(link.longUrl);
});

// Запуск сервера
app.listen(PORT, () => console.log(`Backend запущен на порту ${PORT}`));
