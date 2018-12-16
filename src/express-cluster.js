const cluster = require('cluster');
const os = require('os');
const express = require('express');

const computeCostlyResult = require('./costly-func');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  global.console.log(`Creating ${cpuCount} workers`);
  for (let i = 0; i < cpuCount; ++i) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get('/', (req, res) => {
    // global.console.warn(`Worker ${cluster.worker.id} handling`);
    const start = Date.now();
    const result = computeCostlyResult();
    const end = Date.now();
    res.json({ start, end });
  });
  app.listen(process.env.PORT || 3002);
}

cluster.on('exit', () => {
  cluster.fork();
});
