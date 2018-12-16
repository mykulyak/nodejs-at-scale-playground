const express = require('express');

const computeCostlyResult = require('./costly-func');

const app = express();

app.get('/', (req, res) => {
  const start = Date.now();
  const result = computeCostlyResult();
  const end = Date.now();
  res.json({ start, end });
});

app.listen(process.env.PORT || 3001);
