const SpeedTest = require('./../src/speed-test');
const promFormatter = require('./../src/prom-formatter');

let test = new SpeedTest();
test.run()
  .then(v => {
    console.log('v', v);
    console.log('f', promFormatter.format(v));
  })
  .catch(e => {
    console.log('e', e);
  });
