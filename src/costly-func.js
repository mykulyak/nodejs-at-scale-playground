function computeCostlyResult() {
  let result = 0;
  for (let i = 0; i < 1000000; ++i) {
    result += Math.random();
  }
  return result;
}

module.exports = computeCostlyResult;
