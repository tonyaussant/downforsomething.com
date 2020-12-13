const express = require('express');
const router = express.Router();
const path = require('path');
const functions = require('../functions/functions');
const phase1Data = path.join(__dirname, '../data/phase1.json');

router.get('/', (req, res) => {
  res.json(functions.getPhaseData(phase1Data));
});

router.get('/:id', (req, res) => {
  res.json(functions.getPhaseDataByID(phase1Data, req.params.id));
});

router.get('/:id/phase2', (req, res) => {
  res.json(functions.getPhase2DataByPhase1ID(req.params.id));
});

module.exports = router;