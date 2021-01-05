const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const data = await prisma.plans.findMany();
  res.json(data);
});

router.get('/:code', async (req, res) => {
  const data = await prisma.plans.findUnique({
    where: {
      code: req.params.code
    }
  });
  if(data === null) {
    return res.json(`No plan found with code: ${req.params.code}`);
  } else {
    res.json(data);
  }
});

router.get('/:code/users', async (req, res) => {
  const data = await prisma.users.findMany({
    where: {
      planCode: req.params.code
    }
  });
  if(!data.length) {
    return res.json(`No plan found with code: ${req.params.code}`);
  } else {
    res.json(data);
  }
});

module.exports = router;