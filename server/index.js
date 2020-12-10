const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const ora = require('ora');

require('dotenv').config();
const port = process.env.PORT;
const mainURL = process.env.BACKEND_URL;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    welcome: 'Welcome to the BrainFlix API',
    routes: [],
  });
});

app.listen(port, () => {
  ora(`listening at ${mainURL}:${port}`).start();
});