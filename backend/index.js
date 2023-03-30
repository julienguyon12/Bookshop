import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'julien',
  database: 'test',
});
app.use(express.json());
app.use(cors());
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'julien';
app.get('/', (req, res) => {
  res.json('hello this is the backend');
});
app.get('/books', (req, res) => {
  const q = 'SELECT * FROM test.books;';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post('/books', (req, res) => {
  const q = 'INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUE (?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Books have been created');
  });
});
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'DELETE FROM BOOKS WHERE id = ?';
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Books have been delated');
  });
});
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q =
    'UPDATE books SET `title` = ?,`desc` = ?,`cover` = ?,`price` = ? WHERE id = ?';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Books have been updated');
  });
});
app.listen(8800, () => {
  console.log('connected to backendl');
});
