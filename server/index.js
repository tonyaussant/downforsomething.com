const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const cors = require('cors');
const helmet = require('helmet');
const ora = require('ora');
const phase1Route = require('./routes/phase1');
const phase2Route = require('./routes/phase2');

require('dotenv').config();
const mainPort = process.env.MAIN_PORT;
const mainURL = process.env.BACKEND_URL;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/phase1', phase1Route);
app.use('/phase2', phase2Route);

app.get('/', (req, res) => {
  res.json({
    welcome: 'Welcome to the Down For Something API',
    routes: [
      {
        method: 'get',
        endpoint: '/phase1'
      },
      {
        method: 'get',
        endpoint: '/phase1/:id'
      },
      {
        method: 'get',
        endpoint: '/phase2'
      },
      {
        method: 'get',
        endpoint: '/phase2/:id'
      },
      {
        method: 'get',
        endpoint: '/phase1/:id/phase2'
      },
      {
        method: 'get',
        endpoint: '/phase2/:id/results'
      }
    ]
  });
});

io.on('connection', (socket) => {
});

server.listen(mainPort, () => {
  ora(`listening at ${mainURL}:${mainPort} `).start();
});