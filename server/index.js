const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');

require('dotenv').config();
const PORT = process.env.PORT || process.env.DEV_PORT;
const INDEX = '/index.html';

const io = require('socket.io')
const server = express();

const cors = require('cors');
const mysql = require('mysql');
const phase1Route = require('./routes/phase1');
const phase2Route = require('./routes/phase2');
const plansRoute = require('./routes/plans');
const prismaFunc = require('./functions/prisma');

server.use((req, res) => res.sendFile(INDEX, { root: __dirname }));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());
server.use('/api/phase1', phase1Route);
server.use('/api/phase2', phase2Route);
server.use('/api/plans', plansRoute);

let connection;

if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection(process.env.DATABASE_URL);
}

if(process.env.NODE_ENV === "production") {
  app.use.use((req, res) => res.sendFile(INDEX, {root: __dirname}));
}

io.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    socket.join(data.planCode);
  });

  socket.on('createPlan', (data) => {
    prismaFunc.createPlan(data.planCode, data.name)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('createPlan');
        prismaFunc.planExpiry(data.planCode);
        await prisma.$disconnect();
      });
  });

  socket.on('joinPlan', (data) => {
    prismaFunc.createUser(data.planCode, data.name)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('joinPlan');
        await prisma.$disconnect();
      });
  });

  socket.on('startPlan', (data) => {
    prismaFunc.startPlan(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('startPlan');
        await prisma.$disconnect();
      });
  });

  socket.on('finishedPhase', (data) => {
    prismaFunc.finishedPhase(data)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('finishedPhase');
        await prisma.$disconnect();
      });
  });

  socket.on('finishedTieBreaker', (data) => {
    prismaFunc.finishedTieBreaker(data)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('finishedPhase');
        await prisma.$disconnect();
      });
  });

  socket.on('retryPhase', (data) => {
    prismaFunc.resetPhase(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('retryPhase');
        await prisma.$disconnect();
      });
  });

  socket.on('pickRandom', (data) => {
    prismaFunc.pickRandom(data.planCode, data.phase)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('pickRandom');
        await prisma.$disconnect();
      });
  });

  socket.on('nextPhase', (data) => {
    prismaFunc.nextPhase(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('nextPhase', data.winnerID);
        await prisma.$disconnect();
      });
  });

  socket.on('getResults', (data) => {
    io.to(data.planCode).emit('getResults', data.winnerID);
  });

  socket.on('deletePlan', (data) => {
    prismaFunc.deletePlan(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  });
});

server.listen(PORT, () => {
  console.log(`listening on Port:${PORT}`);
});

connection.connect(error => {
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;