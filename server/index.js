const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  pingTimeout: 30000,
  cors: {
    origin: '*',
  }
});

const cors = require('cors');
const helmet = require('helmet');
const ora = require('ora');
const phase1Route = require('./routes/phase1');
const phase2Route = require('./routes/phase2');
const plansRoute = require('./routes/plans');
const functions = require('./functions/prisma');

require('dotenv').config();
const mainPort = process.env.MAIN_PORT;
const mainURL = process.env.BACKEND_URL;

app.use(express.json());
app.use(cors());
app.use(helmet());
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
        await prisma.$disconnect();
        io.to(data.planCode).emit('planCreated');
      });
  });

  socket.on('joinPlan', (data) => {
    functions.createUser(data.planCode, data.name, socket.id)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('userCreated');
        await prisma.$disconnect();
      });
  })

  socket.on('startPlan', (data) => {
    functions.startPlan(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  })

  socket.on('choiceMade', (data) => {
    functions.choiceMade(data.planCode, data.optionPicked)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('choiceMade', (data));
        await prisma.$disconnect();
      });
  })

  socket.on('resetPlan', (data) => {
    functions.resetPlan(data.planCode)
      .catch(error => {
        throw error
      })
      .finally(async () => {
        io.to(data.planCode).emit('resetPlan');
        await prisma.$disconnect();
      });
  })

  socket.on('disconnect', (reason) => {
    console.log(reason);
  })
});

server.listen(mainPort, () => {
  ora(`listening at ${mainURL}:${mainPort} `).start();
});