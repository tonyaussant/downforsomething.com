function randomOptionThree() {
  const randomNumber = Math.random();

  if(randomNumber <= 0.3333) {
    return 'option1Total';
  } else if(randomNumber <= 0.6666) {
    return 'option2Total';
  } else {
    return 'option3Total';
  }
}

function randomOptionFive() {
  const randomNumber = Math.random();

  if(randomNumber <= 0.2) {
    return 'option1Total';
  } else if(randomNumber <= 0.4) {
    return 'option2Total';
  } else if(randomNumber <= 0.6) {
    return 'option3Total';
  } else if(randomNumber <= 0.8) {
    return 'option4Total';
  } else {
    return 'option5Total';
  }
}

module.exports = {randomOptionThree, randomOptionFive};