const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Basanta111';

const app = express();

app.use(express.json());

const users = [];

// coding starts...

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (user) {
    return res.status(201).json({ Error: 'User already exists' });
  }

  users.push({ username, password });
  res.json({ message: 'Completed!' });
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ Error: 'User not found!' });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET);
  user.token = token;

  res.json({ token });
});

app.get('/me', (req, res) => {
  const token = req.headers.token;
});
