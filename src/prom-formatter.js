
function format(results) {
  let output = '';
  const lb = '\n';

  output += `# TYPE speedtest_bits_per_second gauge${lb}`;
  output += `# HELP speedtest_bits_per_second Speed measured against speedtest.net${lb}`;
  output += `speedtest_bits_per_second{direction="downstream"} ${results.download.bandwidth}${lb}`;
  output += `speedtest_bits_per_second{direction="upstream"} ${results.upload.bandwidth}${lb}`;

  output += `# TYPE speedtest_ping gauge${lb}`;
  output += `# HELP speedtest_ping Ping in ms${lb}`;
  output += `speedtest_ping ${results.ping.latency}${lb}`;

  return output;
}

module.exports = {format};
