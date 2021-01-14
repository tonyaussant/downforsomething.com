const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const helperFunc = require('./helper');

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
  });
  const choicesNeeded = (users.length * 3);
  const tieBreakersNeeded = (users.length);
  await prisma.plans.update({
    where: {
      planCode: planCode
    },
    data: {
      choicesNeeded: choicesNeeded,
      tieBreakersNeeded: tieBreakersNeeded,
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
      option4Total: currentData.option4Total + data.option4,
      option5Total: currentData.option5Total + data.option5,
      choicesTotal: currentData.choicesTotal + data.choicesMade
    }
  });
  await prisma.users.update({
    where: {
     id: data.userID
    },
    data: {
      [data.phaseDone]: true
    }
  });
}

async function finishedTieBreaker(data) {
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
      retryTotal: currentData.retryTotal + data.retry,
      randomTotal: currentData.randomTotal + data.random,
      tieBreakersTotal: currentData.tieBreakersTotal + 1
    }
  });
  await prisma.users.update({
    where: {
     id: data.userID
    },
    data: {
      tieBreakerDone: true
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
      option4Total: 0,
      option5Total: 0,
      choicesTotal: 0,
      retryTotal: 0,
      randomTotal: 0,
      tieBreakersTotal: 0
    }
  });
  await prisma.users.updateMany({
    where: {
      planCode: planCode
    },
    data: {
      phase1Done: false,
      phase2Done: false,
      tieBreakerDone: false
    }
  });
}

async function pickRandom(planCode, phase) {
  const planData = await prisma.plans.findUnique({
    where: {
      planCode: planCode
    }
  });
  if(!planData.randomGenerated) {
    if(phase === 'phase1') {
      const winningOption = helperFunc.randomOptionThree();
      await prisma.plans.update({
        where: {
          planCode: planCode
        },
        data: {
          [winningOption]: 999,
          retryTotal: 0,
          randomTotal: 0,
          tieBreakersTotal: 0,
          randomGenerated: true
        }
      });
    } else {
      const winningOption = helperFunc.randomOptionFive();
      await prisma.plans.update({
        where: {
          planCode: planCode
        },
        data: {
          [winningOption]: 999,
          retryTotal: 0,
          randomTotal: 0,
          tieBreakersTotal: 0,
          randomGenerated: true
        }
      });
    }
  }
}

async function nextPhase(planCode) {
  const users = await prisma.users.findMany({
    where: {
      planCode: planCode
    }
  });
  const choicesNeeded = (users.length * 5);
  await prisma.plans.update({
    where: {
      planCode: planCode
    },
    data: {
      choicesNeeded: choicesNeeded,
      option1Total: 0,
      option2Total: 0,
      option3Total: 0,
      option4Total: 0,
      option5Total: 0,
      choicesTotal: 0,
      retryTotal: 0,
      randomTotal: 0,
      tieBreakersTotal: 0,
      randomGenerated: false
    }
  });
  await prisma.users.updateMany({
    where: {
      planCode: planCode
    },
    data: {
      tieBreakerDone: false
    }
  });
}

async function deletePlan(planCode) {
  const planData = await prisma.plans.findUnique({
    where: {
      planCode: planCode
    }
  });
  if(planData) {
    await prisma.plans.delete({
      where: {
        planCode: planCode
      }
    });
  }
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
  }, 21600000);
}

module.exports = {createPlan, createUser, startPlan, finishedPhase, finishedTieBreaker, resetPhase, pickRandom, nextPhase, deletePlan, planExpiry}