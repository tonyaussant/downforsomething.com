const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express();

const server = require('http').createServer();
const io = require('socket.io')(server, {
  pingTimeout: 30000,
  cors: {
    origin: '*',
  }
});

const cors = require('cors');
const phase1Route = require('./routes/phase1');
const phase2Route = require('./routes/phase2');
const plansRoute = require('./routes/plans');
const functions = require('./functions/prisma');

require('dotenv').config();
const mainPort = process.env.MAIN_PORT;
const socketPort = process.env.SOCKET_PORT;
const mainURL = process.env.BACKEND_URL;

app.use(express.json());
app.use(cors());
app.use('/phase1', phase1Route);
app.use('/phase2', phase2Route);
app.use('/plans', plansRoute);

io.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    socket.join(data.planCode);
  });

  socket.on('createPlan', (data) => {
    functions.createPlan(data.planCode, data.name, socket.id)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('createPlan');
        await prisma.$disconnect();
      });
  });

  socket.on('joinPlan', (data) => {
    functions.createUser(data.planCode, data.name, socket.id)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('joinPlan');
        await prisma.$disconnect();
      });
  });

  socket.on('startPlan', (data) => {
    functions.startPlan(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('startPlan');
        await prisma.$disconnect();
      });
  });

  socket.on('startPhase', (data) => {
    functions.startPhase(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('startPhase');
        await prisma.$disconnect();
      });
  });

  socket.on('finishedPhase', (data) => {
    functions.finishedPhase(data)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('finishedPhase');
        await prisma.$disconnect();
      });
  });

  socket.on('retryPhase', (data) => {
    functions.retryPhase(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('retryPhase');
        await prisma.$disconnect();
      });
  });

  socket.on('retryWithTwo', (data) => {
    functions.retryPhase(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('retryWithTwo');
        await prisma.$disconnect();
      });
  });

  socket.on('nextPhase', (data) => {
    functions.nextPhase(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('nextPhase', data.winnerID);
        await prisma.$disconnect();
      });
  });

  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

app.listen(mainPort, () => {
  console.log(`listening at ${mainURL}:${mainPort}`);
});

server.listen(socketPort, () => {
  console.log(`& ${mainURL}:${socketPort}`);
});