const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function createPlan(planCode, displayName) {
  await prisma.plans.create({
    data: {
      planCode: planCode,
      users: {
        create: [
        {
          name: displayName
        }]
      }
    }
  });
}

async function createUser(planCode, displayName) {
  await prisma.users.create({
    data: {
      name: displayName,
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
  }, {
    
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

async function deletePlan(planCode) {
  await prisma.plans.delete({
    where: {
      planCode: planCode
    }
  });
}

function planExpiry(planCode) {
  setTimeout(() => {
    deletePlan(planCode)
    .catch(error => {
      throw error
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  }, 1800000);
}

module.exports = {createPlan, createUser, startPlan, finishedPhase, resetPhase, deletePlan, planExpiry}