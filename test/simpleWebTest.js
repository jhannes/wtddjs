var selenium = require('selenium-standalone');
var server = selenium({ stdio: 'pipe' }, ["-debug"]);
server.stdout.setEncoding("utf8");
server.stdout.on('data', function(output) {
  console.log(output);
});

var client = require('webdriverjs')
  .remote({
    desiredCapabilities: {
      browserName: 'phantomjs',
      "phantomjs.binary.path": __dirname + "/../node_modules/.bin/phantomjs.cmd"
    },
    logLevel: ""
  });

var expect = require('chai').expect;

describe("web application", function() {

  before(function(done) {
    this.timeout(15000);
    client = client.init().url("http://localhost:3000", done);
  });

  after(function(done) {
    client.end();
    done();
  })

  it("has correct title on front page", function(done) {
    client.title(function(err, res) {
      expect(res.value).to.have.string("Hello World");
      done();
    });
  });

});
