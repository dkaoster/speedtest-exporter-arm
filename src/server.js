const Koa = require('koa');
const _ = require('koa-route');
const speedTest = require('speedtest-net');
const promFormatter = require('./prom-formatter');

// eslint-disable-next-line radix
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT) || 120;

const app = new Koa();

let testResults = '';
let lastRun;

const routes = {
  metrics: async ctx => {
    // Run a new speedtest only if we have passed our timeout threshold
    if (!lastRun || ((lastRun + TEST_TIMEOUT) < Math.floor(new Date().getTime() / 1000))) {
      speedTest({acceptLicense: true})
        .then(v => {
          testResults = promFormatter.format(v);
          console.log('speedtest: ', {
            download: v.download.bandwidth,
            upload: v.upload.bandwidth,
            ping: v.ping.latency
          });

          // Update lastRun time
          lastRun = Math.floor(new Date().getTime() / 1000);
        })
        .catch(e => console.log('e', e));
    }

    ctx.type = 'text/plain; version=0.0.4';
    ctx.body = testResults;
  }
};

app.use(_.get('/metrics/', routes.metrics));

app.listen(9696);
