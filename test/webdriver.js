var DEBUG = false;
var VERBOSE = false;

var started = false;

var startSeleniumServer = function(done) {
  var selenium = require('selenium-standalone');
  var server = selenium({ stdio: 'pipe' },
    [DEBUG ? "-debug" : ""]
  );
  server.stdout.setEncoding("utf8");
  server.stdout.on('data', function(output) {
    if (VERBOSE) console.log(output);
    if (!started) {
      started = true;
      done();
    }
  });
};

var startWebDriver = function(done) {
  var desiredCapabilities = {
    browserName: 'phantomjs',
  };
  if (/^win/.test(process.platform) && desiredCapabilities.browserName === "phantomjs") {
    desiredCapabilities["phantomjs.binary.path"] = __dirname + "/../node_modules/.bin/phantomjs.cmd";
  }
  var client = require('webdriverjs').remote({
    desiredCapabilities: desiredCapabilities,
    logLevel: (DEBUG ? "debug" : "")
  });
  startSeleniumServer(done);
  return client;
}

module.exports = function(done) {
  var client = startWebDriver(function() {
    client.init().url("http://localhost:3000", done)
  });
  return client;
};
