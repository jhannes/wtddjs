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

var startAppServer = function(done) {
  if (process.env.URL) {
    return done(process.env.URL);
  }

  var app = require('../app');
  var server = app.listen(0, function() {
    var port = server.address().port;
    done("http://localhost:" + port + "/");
  });
};

module.exports = function(done) {
  var client = startWebDriver(function() {
    startAppServer(function(url) {
      console.log("Running tests with " + url);
      client.init().url(url, done);
    });
  });
  return client;
};
