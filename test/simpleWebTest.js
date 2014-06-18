var webdriver = require('./webdriver');
var expect = require('chai').expect;

describe("web application", function() {

  before(function(done) {
    this.timeout(5000);
    client = webdriver(done);
  });

  after(function() {
    client.end();
  })

  it("has correct title on front page", function(done) {
    client.title(function(err, res) {
      expect(res.value).to.have.string("Hello World");
      done();
    });
  });

});
