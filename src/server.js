const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WC#i3oqcNh0o',
  database: 'wtf_db'
});

cloudinary.config({ 
  cloud_name: 'droi2nd1z', 
  api_key: '598973367993171', 
  api_secret: 'EkBYvLS618KHfMUfmTLNptqAxfc' 
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    throw err;
  }
  console.log('Подключение к базе данных успешно установлено');
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/uploadPhoto', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'WTFADMIN', 
    });

    const imageUrl = result.secure_url;
    const { title, link, text } = req.body;

    const sql = `INSERT INTO past_orders_info (Header, link, photo, description) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [title, link, imageUrl, text], (err, result) => {
      if (err) {
        console.error('Ошибка выполнения SQL запроса:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
        return;
      }
      console.log('Данные успешно добавлены в базу данных');
      res.status(200).send('Данные успешно добавлены в базу данных');
    });
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
