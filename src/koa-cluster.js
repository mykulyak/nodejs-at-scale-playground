const cluster = require('cluster');
const os = require('os');
const Koa = require('koa');

const computeCostlyResult = require('./costly-func');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  global.console.log(`Creating ${cpuCount} workers`);
  for (let i = 0; i < cpuCount; ++i) {
    cluster.fork();
  }
} else {
  const app = new Koa();
  app.use(async ctx => {
    const start = Date.now();
    const result = computeCostlyResult();
    const end = Date.now();
    ctx.body = JSON.stringify({ start, end });
  });
  app.listen(process.env.PORT || 3102);
}

cluster.on('exit', () => {
  cluster.fork();
});
