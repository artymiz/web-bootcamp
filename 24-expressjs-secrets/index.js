// NOTE: make sure .env file with PASSWORD is in the root directory
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;


// middlewares
app.use(bodyParser.urlencoded({ extended: true }));

var userAuthenticated = false;

const checkPassword = (req, _, next) => {
  // no longer authorized if home page is requested again
  userAuthenticated = false;
  if (req.body.password === process.env.PASSWORD) {
    userAuthenticated = true;
  }
  next();
};

app.use(checkPassword);


// routes
const homePath = join(__dirname, 'public', 'index.html');
const secretPath = join(__dirname, 'public', 'secret.html');

app.get('/', (_, res) => {
  res.sendFile(homePath);
});

app.post('/check', (req, res) => {
  console.log(`You entered: ${req.body.password}`);
  if (userAuthenticated) {
    res.sendFile(secretPath);
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
