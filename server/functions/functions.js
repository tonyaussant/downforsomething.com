const fs = require('fs');
const path = require('path');

function getPhaseData(dataFile) {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

function getPhaseDataByID(dataFile, id) {
  const dataArray = getPhaseData(dataFile);
  let filteredArray = dataArray.filter((item) => item.id === id);
  if (filteredArray.length) {
    return filteredArray;
  } else {
    return `No data found with ID: ${id}`;
  }
}

function getPhase2DataByPhase1ID(id) {
  const dataArray = getPhaseData(path.join(__dirname, '../data/phase2.json'));
  let filteredArray = dataArray.filter((item) => item.parentID === id);
  if (filteredArray.length) {
    return filteredArray;
  } else {
    return `No data found with ID: ${id}`;
  }
}

module.exports = {getPhaseData, getPhaseDataByID, getPhase2DataByPhase1ID};