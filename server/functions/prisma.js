const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function createPlan(planCode, displayName, socketID) {
  await prisma.plans.create({
    data: {
      planCode: planCode,
      users: {
        create: [
        {
          name: displayName,
          socketID: socketID
        }]
      }
    }
  });
}

async function createUser(planCode, displayName, socketID) {
  await prisma.users.create({
    data: {
      name: displayName,
      socketID: socketID,
      plans: {
        connect: {
          planCode: planCode
        }
      }
    }
  });
}

async function startPlan(planCode) {
  const users = await prisma.users.findMany({
    where: {
      planCode: planCode
    }
  });
  const choicesNeeded = (users.length * 3);
  await prisma.plans.update({
    where: {
      planCode: planCode
    },
    data: {
      choicesNeeded: choicesNeeded,
      roomOpen: false
    }
  });
}

async function finishedPhase(data) {
  const currentData = await prisma.plans.findUnique({
    where: {
      planCode: data.planCode
    }
  });
  await prisma.plans.update({
    where: {
      planCode: data.planCode
    },
    data: {
      option1Total: currentData.option1Total + data.option1,
      option2Total: currentData.option2Total + data.option2,
      option3Total: currentData.option3Total + data.option3,
      choicesTotal: currentData.choicesTotal + data.choicesMade
    }
  });
}

async function resetPhase(planCode) {
  await prisma.plans.update({
    where: {
      planCode: planCode
    },
    data: {
      option1Total: 0,
      option2Total: 0,
      option3Total: 0,
      choicesTotal: 0
    }
  });
}

module.exports = {createPlan, createUser, startPlan, finishedPhase, resetPhase}