const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function createPlan(planCode, displayName, socketID) {
  await prisma.plans.create({
    data: {
      code: planCode,
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
          code: planCode
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
      code: planCode
    },
    data: {
      choicesNeeded: choicesNeeded,
      roomOpen: false
    }
  });
}

async function choiceMade(planCode, optionPicked) {
  const currentData = await prisma.plans.findUnique({
    where: {
      code: planCode
    }
  });
  if(optionPicked) {
    await prisma.plans.update({
      where: {
        code: planCode
      },
      data: {
        [optionPicked]: currentData[optionPicked] + 1,
        choicesMade: currentData.choicesMade + 1
      }
    });
  } else {
    await prisma.plans.update({
      where: {
        code: planCode
      },
      data: {
        choicesMade: currentData.choicesMade + 1
      }
    });
  }
}

module.exports = {createPlan, createUser, startPlan, choiceMade}