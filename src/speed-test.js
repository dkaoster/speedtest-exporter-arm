const speedTestNet = require('speedtest-net');
const eventToPromise = require('event-to-promise');

class SpeedTest {
  async run() {
    let s = speedTestNet();
    return eventToPromise(s, 'data').then(data => data);
  }
}

module.exports = SpeedTest;
