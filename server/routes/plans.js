const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const data = await prisma.plans.findMany();
  res.json(data);
});

router.get('/:planCode', async (req, res) => {
  const data = await prisma.plans.findUnique({
    where: {
      planCode: req.params.planCode
    }
  });
  if(data === null) {
    return res.json(`No plan found with plan code: ${req.params.planCode}`);
  } else {
    res.json(data);
  }
});

router.get('/:planCode/users', async (req, res) => {
  const data = await prisma.users.findMany({
    where: {
      planCode: req.params.planCode
    }
  });
  if(!data.length) {
    return res.json(`No plan found with plan code: ${req.params.planCode}`);
  } else {
    res.json(data);
  }
});

module.exports = router;