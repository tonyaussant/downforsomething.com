const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const data = await prisma.phase1.findMany({
    orderBy: {
      option: 'asc'
    }
  });
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const data = await prisma.phase1.findUnique({
    where: {
      id: req.params.id
    }
  });
  if(data === null) {
    return res.json(`No data found with ID: ${req.params.id}`);
  } else {
    res.json(data);
  }
});

router.get('/:id/phase2', async (req, res) => {
  const data = await prisma.phase2.findMany({
    where: {
      parentID: req.params.id
    },
    orderBy: {
      option: 'asc'
    }
  });
  if(!data.length) {
    return res.json(`No data found with ID: ${req.params.id}`);
  } else {
    res.json(data);
  }
});

module.exports = router;