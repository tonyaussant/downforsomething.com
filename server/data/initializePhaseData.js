const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const data = require('./phaseData');

async function initializePhaseData() {
  await prisma.phase1.create({data: data.option1});
  await prisma.phase1.create({data: data.option2});
  await prisma.phase1.create({data: data.option3});
}

initializePhaseData()
  .catch(error => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect();
  });