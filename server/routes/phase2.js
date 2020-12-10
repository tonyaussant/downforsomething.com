const express = require('express');
const router = express.Router();
const path = require('path');
const functions = require('../functions/functions');
const phase2Data = path.join(__dirname, '../data/phase2.json');

router.get('/', (req, res) => {
  res.json(functions.getPhaseData(phase2Data));
});

router.get('/:id', (req, res) => {
  res.json(functions.getPhaseDataByID(phase2Data, req.params.id));
});

module.exports = router;