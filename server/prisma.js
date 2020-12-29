const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const data = require('./data/phaseData');

async function main() {
  await prisma.phase1.create({data: data.option1});
  await prisma.phase1.create({data: data.option2});
  await prisma.phase1.create({data: data.option3});
}

main()
  .catch(error => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  })