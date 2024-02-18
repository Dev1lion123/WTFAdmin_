// Импортируем необходимые зависимости
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WC#i3oqcNh0o',
  database: 'wtf_db'
});


connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    throw err;
  }
  console.log('Подключение к базе данных успешно установлено');
});

// Создаем экземпляр express
const app = express();

// Используем middleware для обработки JSON данных
app.use(bodyParser.json());
//app.use(cors());
// Определяем маршрут для обработки POST запросов
app.post("/api/addData", (req, res) => {
  // Получаем данные из тела запроса
  const { title, link, pic, text } = req.body;

  // Выполняем операции с базой данных 
  const sql = `INSERT INTO past_orders_info (Header, link, photo, description) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [title, link, pic, text], (err, result) => {
    if (err) {
      console.error('Ошибка выполнения SQL запроса:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    console.log('Данные успешно добавлены в базу данных');
    res.status(200).send('Данные успешно добавлены в базу данных');
  });
});

// Устанавливаем порт, на котором будет работать сервер
const port = process.env.PORT || 3000;

// Запускаем сервер на выбранном порту
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
