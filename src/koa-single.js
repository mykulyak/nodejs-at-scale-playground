const Koa = require('koa');
const app = new Koa();

const computeCostlyResult = require('./costly-func');

app.use(async ctx => {
  const start = Date.now();
  const result = computeCostlyResult();
  const end = Date.now();
  ctx.body = JSON.stringify({ start, end });
});

app.listen(process.env.PORT || 3101);
