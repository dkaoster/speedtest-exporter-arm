const speedTestNet = require('speedtest-net');
const eventToPromise = require('event-to-promise');

const speedTest = () => {
  let s = speedTestNet();
  return eventToPromise(s, 'data').then(data => data);
};

module.exports = speedTest;
