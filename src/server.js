const Koa = require('koa');
const _ = require('koa-route');
const SpeedTest = require('./speed-test');
const promFormatter = require('./prom-formatter');

const app = new Koa();

let testResults = '';

const routes = {
  metrics: async ctx => {
    try {
      let test = new SpeedTest();
      test.run()
        .then(v => {
          testResults = promFormatter.format(v);
          console.log('speedtest: ', {download: v.speeds.download, upload: v.speeds.upload, ping: v.server.ping});
        })
        .catch(e => {
          console.log('e', e);
        });
    } catch (e) {}

    ctx.type = 'text/plain; version=0.0.4';
    ctx.body = testResults;
  }
};

app.use(_.get('/metrics/', routes.metrics));

app.listen(9696);
