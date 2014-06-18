var selenium = require('selenium-standalone');
var server = selenium({ stdio: 'pipe' }, ["-debug"]);

var client = require('webdriverjs').remote({});

var expect = require('chai').expect;

describe("web application", function() {

  before(function(done) {
    this.timeout(15000);
    client = client.init().url("http://localhost:3000", done);
  });

  after(function(done) {
    client.end(done);
  })

  it("has correct title on front page", function(done) {
    client.title(function(err, res) {
      expect(res.value).to.have.string("Hello World");
      done();
    });
  });

});
