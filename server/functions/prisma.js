const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const data = require('../data/phaseData');

async function main() {
  await prisma.phase1.create({data: data.option1});
  await prisma.phase1.create({data: data.option2});
  await prisma.phase1.create({data: data.option3});
}

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
        connect: {code: planCode,}
      }
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = {createPlan, createUser}